import React, {useState} from 'react';
import {Card, Col, Row, Select, Tag} from "antd";
import {Viewer} from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import breaks from "@bytemd/plugin-breaks";
import footnotes from "@bytemd/plugin-footnotes";
import frontmatter from "@bytemd/plugin-frontmatter";
import math from "@bytemd/plugin-math-ssr";
import mermaid from "@bytemd/plugin-mermaid";
import 'juejin-markdown-themes/dist/juejin.min.css';// 掘金主题
const ProblemInfo = () => {
  const plugins = [gfm(), gemoji(), highlight(), mediumZoom(), breaks(), footnotes(), frontmatter(), math(), mermaid()];
  const [question] = useState("有 N 件物品和一个容量是 V 的背包。每件物品只能使用一次。\n" +
    "\n" +
    "第 i 件物品的体积是 vi，价值是 wi。\n" +
    "\n" +
    "求解将哪些物品装入背包，可使这些物品的总体积不超过背包容量，且总价值最大。\n" +
    "输出最大价值。\n" +
    "\n" +
    "**输入格式**\n" +
    "第一行两个整数，N，V，用空格隔开，分别表示物品数量和背包容积。\n" +
    "\n" +
    "接下来有 N 行，每行两个整数 vi,wi，用空格隔开，分别表示第 i 件物品的体积和价值。\n" +
    "\n" +
    "**输出格式**\n" +
    "输出一个整数，表示最大价值。\n" +
    "\n" +
    "**数据范围**\n" +
    "0<N,V≤1000\n" +
    "0<vi,wi≤1000\n" +
    "\n" +
    "**输入样例**\n" +
    "```java\n" +
    "4 5\n" +
    "1 2\n" +
    "2 4\n" +
    "3 4\n" +
    "4 5\n" +
    "```\n" +
    "\n" +
    "**输出样例：**\n" +
    "```java\n" +
    "8\n" +
    "```")


  return (
    <Card
      bordered={false}
      hoverable={true}
      title={
        <strong>题目描述</strong>
      }
      extra={
        <Tag color={"red"}>
          动态规划
        </Tag>
      }
    >
      <Viewer
        // 内部的值
        value={question}
        // 插件
        plugins={plugins}
        // 动态修改值
        // onChange={v => setValue(v)}
      />
    </Card>
  );
}

export default ProblemInfo;
