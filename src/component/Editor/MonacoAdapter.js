import { ColorAssigner } from "@convergence/color-assigner";
import * as MonacoCollabExt from "@convergencelabs/monaco-collab-ext";

class MonacoConvergenceAdapter {
  constructor(monacoEditor, realtimeString) {
    this._monacoEditor = monacoEditor;
    this._model = realtimeString;
    this._colorAssigner = ColorAssigner.Palettes.DEFAULT;
  }

  bind() {
    this._initSharedData();
    this._initSharedCursors();
    this._initSharedSelection();
  }

  _initSharedData() {
    this._contentManager = new MonacoCollabExt.EditorContentManager({
      editor: this._monacoEditor,
      onInsert: (index, text) => {
        this._model.insert(index, text);
      },
      onReplace: (index, length, text) => {
        this._model.model().startBatch();
        this._model.remove(index, length);
        this._model.insert(index, text);
        this._model.model().completeBatch();
      },
      onDelete: (index, length) => {
        this._model.remove(index, length);
      },
      remoteSourceId: "convergence",
    });

    this._model.events().subscribe((e) => {
      switch (e.name) {
        case "insert":
          this._contentManager.insert(e.index, e.value);
          break;
        case "remove":
          this._contentManager.delete(e.index, e.value.length);
          break;
        default:
      }
    });
  }

  _initSharedCursors() {
    this._remoteCursorManager = new MonacoCollabExt.RemoteCursorManager({
      editor: this._monacoEditor,
      tooltips: true,
      tooltipDuration: 2,
    });
    this._cursorReference = this._model.indexReference("cursor");

    const references = this._model.references({ key: "cursor" });
    references.forEach((reference) => {
      if (!reference.isLocal()) {
        this._addRemoteCursor(reference);
      }
    });

    this._setLocalCursor();
    this._cursorReference.share();

    this._monacoEditor.onDidChangeCursorPosition((e) => {
      this._setLocalCursor();
    });

    this._model.on("reference", (e) => {
      if (e.reference.key() === "cursor") {
        this._addRemoteCursor(e.reference);
      }
    });
  }

  _setLocalCursor() {
    const position = this._monacoEditor.getPosition();
    const offset = this._monacoEditor.getModel().getOffsetAt(position);
    this._cursorReference.set(offset);
  }

  _addRemoteCursor(reference) {
    const color = this._colorAssigner[Math.floor(Math.random() * 4)];
    const remoteCursor = this._remoteCursorManager.addCursor(
      reference.sessionId(),
      color,
      reference.user().displayName
    );

    reference.on("cleared", () => remoteCursor.hide());
    reference.on("disposed", () => remoteCursor.dispose());
    reference.on("set", () => {
      const cursorIndex = reference.value();
      remoteCursor.setOffset(cursorIndex);
    });
  }

  _initSharedSelection() {
    this._remoteSelectionManager = new MonacoCollabExt.RemoteSelectionManager({
      editor: this._monacoEditor,
    });

    this._selectionReference = this._model.rangeReference("selection");
    this._setLocalSelection();
    this._selectionReference.share();

    this._monacoEditor.onDidChangeCursorSelection((e) => {
      this._setLocalSelection();
    });

    const references = this._model.references({ key: "selection" });
    references.forEach((reference) => {
      if (!reference.isLocal()) {
        this._addRemoteSelection(reference);
      }
    });

    this._model.on("reference", (e) => {
      if (e.reference.key() === "selection") {
        this._addRemoteSelection(e.reference);
      }
    });
  }

  _setLocalSelection() {
    const selection = this._monacoEditor.getSelection();
    if (!selection.isEmpty()) {
      const start = this._monacoEditor.getModel().getOffsetAt(selection.getStartPosition());
      const end = this._monacoEditor.getModel().getOffsetAt(selection.getEndPosition());
      this._selectionReference.set({ start, end });
    } else if (this._selectionReference.isSet()) {
      this._selectionReference.clear();
    }
  }

  _addRemoteSelection(reference) {
    const color = this._colorAssigner[Math.floor(Math.random() * 4)];

    const remoteSelection = this._remoteSelectionManager.addSelection(reference.sessionId(), color);

    if (reference.isSet()) {
      const selection = reference.value();
      remoteSelection.setOffsets(selection.start, selection.end);
    }

    reference.on("cleared", () => remoteSelection.hide());
    reference.on("disposed", () => remoteSelection.dispose());
    reference.on("set", () => {
      const selection = reference.value();
      remoteSelection.setOffsets(selection.start, selection.end);
    });
  }
}

export default MonacoConvergenceAdapter;
