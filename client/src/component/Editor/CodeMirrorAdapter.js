/**
 * @module bindings/textarea
 */

import { createMutex } from "lib0/mutex.js";
import * as math from "lib0/math.js";
import * as Y from "yjs";
import * as func from "lib0/function.js";
import * as eventloop from "lib0/eventloop.js";
import * as diff from "lib0/diff.js";
import CodeMirror from "codemirror";
import invert from "invert-color";

export const cmOrigin = "prosemirror-binding";

/**
 * @param {CodemirrorBinding} binding
 * @param {any} event
 */
const typeObserver = (binding, event) => {
  binding._mux(() => {
    const cmDoc = binding.cmDoc;
    const cm = cmDoc.getEditor();
    // Normally the position is right-associated
    // But when remote changes happen, it looks like the remote user is hijacking your position.
    // Just for remote insertions, we make the collapsed cursor left-associated.
    // If selection is not collapsed, we only make "to" left associated
    let anchor = cm.indexFromPos(cm.getCursor("anchor"));
    let head = cm.indexFromPos(cm.getCursor("head"));
    const switchSel = head < anchor;
    // normalize selection so that anchor < head, switch back later
    if (switchSel) {
      const tmp = head;
      head = anchor;
      anchor = tmp;
    }
    const performChange = () => {
      const delta = event.delta;
      let index = 0;
      for (let i = 0; i < event.delta.length; i++) {
        const d = delta[i];
        if (d.retain) {
          index += d.retain;
        } else if (d.insert) {
          if (index < anchor || (anchor < head && index === anchor)) {
            anchor += d.insert.length;
          }
          if (index < head) {
            head += d.insert.length;
          }
          const pos = cmDoc.posFromIndex(index);
          cmDoc.replaceRange(d.insert, pos, pos, cmOrigin);
          index += d.insert.length;
        } else if (d.delete) {
          if (index < anchor) {
            anchor = math.max(anchor - d.delete, index);
          }
          if (index < head) {
            head = math.max(head - d.delete, index);
          }
          const start = cmDoc.posFromIndex(index);
          const end = cmDoc.posFromIndex(index + d.delete);
          cmDoc.replaceRange("", start, end, cmOrigin);
        }
      }
    };
    // if possible, bundle the changes using cm.operation
    if (cm) {
      cm.operation(performChange);
    } else {
      performChange();
    }
    if (switchSel) {
      const tmp = head;
      head = anchor;
      anchor = tmp;
    }
    cm.setSelection(cm.posFromIndex(anchor), cm.posFromIndex(head), {
      scroll: false,
    });
  });
};

const targetObserver = (binding, changes) => {
  binding._mux(() => {
    binding.doc.transact(() => {
      if (changes.length > 1) {
        // If there are several consecutive changes, we can't reliably compute the positions anymore. See y-codemirror#11
        // Instead, we will compute the diff and apply the changes
        const d = diff.simpleDiffString(binding.type.toString(), binding.cmDoc.getValue());
        binding.type.delete(d.index, d.remove);
        binding.type.insert(d.index, d.insert);
      } else {
        const change = changes[0];
        const start = binding.cmDoc.indexFromPos(change.from);
        const delLen = change.removed.map((s) => s.length).reduce(math.add) + change.removed.length - 1;
        if (delLen > 0) {
          binding.type.delete(start, delLen);
        }
        if (change.text.length > 0) {
          binding.type.insert(start, change.text.join("\n"));
        }
      }
    }, binding);
  });
};

const createRemoteCaret = (username, color) => {
  const caret = document.createElement("span");
  caret.classList.add("remote-caret");
  caret.setAttribute("style", `border-color: ${color}`);
  const userDiv = document.createElement("div");
  userDiv.setAttribute("style", `background-color: ${color}`, `color: ${invert(color, true)}`);
  userDiv.insertBefore(document.createTextNode(username), null);
  caret.insertBefore(userDiv, null);
  setTimeout(() => {
    caret.classList.add("hide-name");
  }, 2000);
  return caret;
};

const createEmptyLinePlaceholder = (color) => {
  const placeholder = document.createElement("span");
  placeholder.setAttribute("style", "user-select: none;");
  const emptyTxt = document.createElement("span");
  emptyTxt.insertBefore(document.createTextNode(""), null);
  const sel = document.createElement("span");
  sel.setAttribute("class", "y-line-selection");
  sel.setAttribute(
    "style",
    `display: inline-block; position: absolute; left: 4px; right: 4px; top: 0; bottom: 0; background-color: ${color}50; mix-blend-mode: color-dodge;`
  );
  placeholder.insertBefore(sel, null);
  placeholder.insertBefore(emptyTxt, null);
  return placeholder;
};

const updateRemoteSelection = (y, cm, type, cursors, clientId, awareness) => {
  // redraw caret and selection for clientId
  const aw = awareness.getStates().get(clientId);
  // destroy current text mark
  const m = cursors.get(clientId);
  if (m !== undefined) {
    if (m.caret) {
      m.caret.clear();
    }
    m.sel.forEach((sel) => sel.clear());
    cursors.delete(clientId);
  }
  if (aw === undefined) {
    return;
  }
  const user = aw.user || {};
  if (user.color == null) {
    user.color = "#ffa500";
  }
  if (user.name == null) {
    user.name = `User: ${clientId}`;
  }
  const cursor = aw.cursor;
  if (cursor == null || cursor.anchor == null || cursor.head == null) {
    return;
  }
  const anchor = Y.createAbsolutePositionFromRelativePosition(JSON.parse(cursor.anchor), y);
  const head = Y.createAbsolutePositionFromRelativePosition(JSON.parse(cursor.head), y);
  if (anchor !== null && head !== null && anchor.type === type && head.type === type) {
    const headpos = cm.posFromIndex(head.index);
    const anchorpos = cm.posFromIndex(anchor.index);
    let from, to;
    if (head.index < anchor.index) {
      from = headpos;
      to = anchorpos;
    } else {
      from = anchorpos;
      to = headpos;
    }
    const caretEl = createRemoteCaret(user.name, user.color);
    // if position was "relatively" the same, do not show name again and hide instead
    if (
      m &&
      func.equalityFlat(aw.cursor.anchor, m.awCursor.anchor) &&
      func.equalityFlat(aw.cursor.head, m.awCursor.head)
    ) {
      caretEl.classList.add("hide-name");
    }
    const sel = [];

    if (head.index !== anchor.index) {
      if (from.line !== to.line && from.ch !== 0) {
        // start of selection will only be a simple text-selection
        sel.push(
          cm.markText(from, new CodeMirror.Pos(from.line + 1, 0), {
            css: `background-color: ${user.color}50;`,
            inclusiveRight: false,
            inclusiveLeft: false,
          })
        );
        from = new CodeMirror.Pos(from.line + 1, 0);
      }
      while (from.line !== to.line) {
        // middle of selection is always a whole-line selection. We add a widget at the first position which will fill the background.
        sel.push(
          cm.setBookmark(new CodeMirror.Pos(from.line, 0), {
            widget: createEmptyLinePlaceholder(user.color),
          })
        );
        from = new CodeMirror.Pos(from.line + 1, 0);
      }
      sel.push(
        cm.markText(from, to, {
          css: `background-color: ${user.color}50;`,
          inclusiveRight: false,
          inclusiveLeft: false,
        })
      );
    }
    // only render caret if not the complete last line was selected (in this case headpos.ch === 0)
    const caret =
      sel.length > 0 && to === headpos && headpos.ch === 0
        ? null
        : cm.setBookmark(headpos, { widget: caretEl, insertLeft: true });
    cursors.set(clientId, { caret, sel, awCursor: cursor });
  }
};

const codemirrorCursorActivity = (y, cm, type, awareness) => {
  const aw = awareness.getLocalState();
  if (!cm.hasFocus() || aw == null || !cm.display.wrapper.ownerDocument.hasFocus()) {
    return;
  }
  const newAnchor = Y.createRelativePositionFromTypeIndex(type, cm.indexFromPos(cm.getCursor("anchor")));
  const newHead = Y.createRelativePositionFromTypeIndex(type, cm.indexFromPos(cm.getCursor("head")));
  let currentAnchor = null;
  let currentHead = null;
  if (aw.cursor != null) {
    currentAnchor = Y.createRelativePositionFromJSON(JSON.parse(aw.cursor.anchor));
    currentHead = Y.createRelativePositionFromJSON(JSON.parse(aw.cursor.head));
  }
  if (
    aw.cursor == null ||
    !Y.compareRelativePositions(currentAnchor, newAnchor) ||
    !Y.compareRelativePositions(currentHead, newHead)
  ) {
    awareness.setLocalStateField("cursor", {
      anchor: JSON.stringify(newAnchor),
      head: JSON.stringify(newHead),
    });
  }
};

/**
 * A binding that binds a YText to a CodeMirror editor.
 *
 * @example
 *   const ytext = ydocument.define('codemirror', Y.Text)
 *   const editor = new CodeMirror(document.querySelector('#container'), {
 *     mode: 'javascript',
 *     lineNumbers: true
 *   })
 *   const binding = new CodemirrorBinding(ytext, editor)
 *
 */
export class CodemirrorBinding {
  /**
   * @param {Y.Text} textType
   * @param {import('codemirror').Editor} codeMirror
   * @param {any | null} [awareness]
   * @param {{ yUndoManager?: Y.UndoManager }} [options]
   */
  constructor(textType, codeMirror, awareness = null, { yUndoManager = null } = {}) {
    const doc = textType.doc;
    const cmDoc = codeMirror.getDoc();
    this.doc = doc;
    this.type = textType;
    this.cm = codeMirror;
    this.cmDoc = cmDoc;
    this.awareness = awareness || null;
    this.yUndoManager = yUndoManager;
    this._onStackItemAdded = ({ stackItem, changedParentTypes }) => {
      // only store metadata if this type was affected
      if (changedParentTypes.has(textType) && this._beforeChangeSelection) {
        stackItem.meta.set(this, this._beforeChangeSelection);
      }
    };
    this._onStackItemPopped = ({ stackItem }) => {
      const sel = stackItem.meta.get(this);
      if (sel) {
        const anchor = Y.createAbsolutePositionFromRelativePosition(sel.anchor, doc).index;
        const head = Y.createAbsolutePositionFromRelativePosition(sel.head, doc).index;
        codeMirror.setSelection(codeMirror.posFromIndex(anchor), codeMirror.posFromIndex(head));
        this._beforeChange();
      }
    };
    if (yUndoManager) {
      yUndoManager.trackedOrigins.add(this); // track changes performed by this editor binding
      const editorUndo = (cm) => {
        // Keymaps always start with an active operation.
        // End the current operation so that the event is fired at the correct moment.
        // @todo check cm.curOp in typeListener and endOperation always.
        cm.endOperation();
        yUndoManager.undo();
        cm.startOperation();
      };
      const editorRedo = (cm) => {
        cm.endOperation();
        yUndoManager.redo();
        cm.startOperation();
      };
      codeMirror.addKeyMap({
        // pc
        "Ctrl-Z": editorUndo,
        "Shift-Ctrl-Z": editorRedo,
        "Ctrl-Y": editorRedo,
        // mac
        "Cmd-Z": editorUndo,
        "Shift-Cmd-Z": editorRedo,
        "Cmd-Y": editorRedo,
      });

      yUndoManager.on("stack-item-added", this._onStackItemAdded);
      yUndoManager.on("stack-item-popped", this._onStackItemPopped);
    }

    this._mux = createMutex();
    // set initial value
    cmDoc.setValue(textType.toString());
    // observe type and target
    this._typeObserver = (event) => typeObserver(this, event);
    this._targetObserver = (instance, changes) => {
      if (instance.getDoc() === cmDoc) {
        targetObserver(this, changes);
      }
    };
    this._cursors = new Map();
    this._changedCursors = new Set();
    this._debounceCursorEvent = eventloop.createDebouncer(10);
    this._awarenessListener = (event) => {
      if (codeMirror.getDoc() !== cmDoc) {
        return;
      }
      const f = (clientId) => {
        if (clientId !== doc.clientID) {
          this._changedCursors.add(clientId);
        }
      };
      event.added.forEach(f);
      event.removed.forEach(f);
      event.updated.forEach(f);
      if (this._changedCursors.size > 0) {
        this._debounceCursorEvent(() => {
          this._changedCursors.forEach((clientId) => {
            updateRemoteSelection(doc, codeMirror, textType, this._cursors, clientId, awareness);
          });
          this._changedCursors.clear();
        });
      }
    };
    this._cursorListener = () => {
      if (codeMirror.getDoc() === cmDoc) {
        setTimeout(() => {
          codemirrorCursorActivity(doc, codeMirror, textType, awareness);
        }, 0);
      }
    };
    this._blurListeer = () => awareness.setLocalStateField("cursor", null);

    textType.observe(this._typeObserver);
    // @ts-ignore
    codeMirror.on("changes", this._targetObserver);
    /**
     * @type {{ anchor: Y.RelativePosition, head: Y.RelativePosition } | null}
     */
    this._beforeChangeSelection = null;
    this._beforeChange = () => {
      // update the the beforeChangeSelection that is stored befor each change to the editor (except when applying remote changes)
      this._mux(() => {
        // store the selection before the change is applied so we can restore it with the undo manager.
        const anchor = Y.createRelativePositionFromTypeIndex(
          textType,
          codeMirror.indexFromPos(codeMirror.getCursor("anchor"))
        );
        const head = Y.createRelativePositionFromTypeIndex(
          textType,
          codeMirror.indexFromPos(codeMirror.getCursor("head"))
        );
        this._beforeChangeSelection = { anchor, head };
      });
    };
    codeMirror.on("beforeChange", this._beforeChange);
    if (awareness) {
      codeMirror.on("swapDoc", this._blurListeer);
      awareness.on("change", this._awarenessListener);
      // @ts-ignore
      codeMirror.on("cursorActivity", this._cursorListener);
      codeMirror.on("blur", this._blurListeer);
      codeMirror.on("focus", this._cursorListener);
    }
  }

  destroy() {
    this.type.unobserve(this._typeObserver);
    this.cm.off("swapDoc", this._blurListeer);
    // @ts-ignore
    this.cm.off("changes", this._targetObserver);
    this.cm.off("beforeChange", this._beforeChange);
    // @ts-ignore
    this.cm.off("cursorActivity", this._cursorListener);
    this.cm.off("focus", this._cursorListener);
    this.cm.off("blur", this._blurListeer);
    if (this.awareness) {
      this.awareness.off("change", this._awarenessListener);
    }
    if (this.yUndoManager) {
      this.yUndoManager.off("stack-item-added", this._onStackItemAdded);
      this.yUndoManager.off("stack-item-popped", this._onStackItemPopped);
      this.yUndoManager.trackedOrigins.delete(this);
    }
    this.type = null;
    this.cm = null;
    this.cmDoc = null;
  }
}

export const CodeMirrorBinding = CodemirrorBinding;
