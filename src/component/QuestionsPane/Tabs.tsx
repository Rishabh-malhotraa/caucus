import React, { useState } from "react";
import { Tabs, Tab, TabPanel, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./ReactTabs.css";
import Settings from "./Settings";
import ProblemList from "./ProblemList/ProblemList";
import parse from "html-react-parser";
import styles from "./Tabs.module.css";
import Chip from "@material-ui/core/Chip";
import { Box } from "@material-ui/core";
export default function TabsComponent() {
  const [tabIndex, setTabIndex] = useState(1);

  const question =
    '<div class="content__u3I1 question-content__JfgR"><div><p>You are given an array <code>prices</code> for which the <code>i<sup>th</sup></code> element is the price of a given stock on day <code>i</code>.</p>\n<p>Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).</p>\n<p><strong>Note:</strong> You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).</p>\n<p> </p>\n<p><strong>Example 1:</strong></p>\n<pre><strong>Input:</strong> prices = [7,1,5,3,6,4]\n<strong>Output:</strong> 7\n<strong>Explanation:</strong> Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.\nThen buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.\n</pre>\n<p><strong>Example 2:</strong></p>\n<pre><strong>Input:</strong> prices = [1,2,3,4,5]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.\nNote that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.\n</pre>\n<p><strong>Example 3:</strong></p>\n<pre><strong>Input:</strong> prices = [7,6,4,3,1]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> In this case, no transaction is done, i.e., max profit = 0.\n</pre>\n<p> </p>\n<p><strong>Constraints:</strong></p>\n<ul>\n<li><code>1 &lt;= prices.length &lt;= 3 * 10<sup>4</sup></code></li>\n<li><code>0 &lt;= prices[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n</div></div>';

  const tags = ["Dynamic Programming", "String"];
  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="tabs_root">
      <TabList style={{ background: "#252526" }}>
        <Tab>Problem</Tab>
        <Tab>Problem List</Tab>
        <Tab>Settings</Tab>
      </TabList>
      <TabPanel>
        <Box className={styles.problem}>
          <h1>Problem name</h1>
          {parse(question)}
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Chip label={tag} color="primary" />
            ))}
          </div>
        </Box>
      </TabPanel>
      <TabPanel style={{ flexGrow: 1 }}>
        <ProblemList />
      </TabPanel>
      <TabPanel>
        <Settings />
      </TabPanel>
    </Tabs>
  );
}
