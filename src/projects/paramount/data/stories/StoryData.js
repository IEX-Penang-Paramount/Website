// Template for adding new articles.
// Content lives in Assets/Content/{articleID}.jsx as a React component.
const Template = {
  articleID: "(MUST BE UNIQUE)",
  title: "template Article",
  abstract: "(Optional so far)",
  abstractQuote: "(Optional so far)",
  author: "",
  time: "",
};

export const stories = [
  {
    articleID: "A1",
    title: "Story of Mr. Tan",
    abstract: "This is a test abstract",
    abstractQuote: "大海教会了我随遇而安。有就有，没有就没有，一切随缘。",
    author: "Junde",
    time: "2026-02-05",
},
    {
    articleID: "A2",
    title: "Story of Mr. Tay",
    abstract: "This is a test abstract 2",
    abstractQuote: "For us, we must follow rules and schedules. We must go out and work, as the money won't fall from the sky.",
    author: "Junde",
    time: "2026-02-10",
},
    {
    articleID: "A3",
    title: "Ipsium Lopium Example 3",
    abstract: "This is a test abstract 3",
    abstractQuote: "This is a test quote 3",
    author: "Example",
    time: "2026-03-02",
  },
  {
    articleID: "A4",
    title: "梁先生口述：北槟渔业空间与海岸记忆",
    abstract:
      "梁先生以三四十年的捕鱼经验，讲述北槟海域的渔业知识、风险边界、环境变化与海岸社区记忆。",
    abstractQuote:
      "真正厉害的渔民，不是征服海的人，而是听懂海的人。",
    author: "Ruohan",
    time: "2026-03-15",
  },
  {
    articleID: "A5",
    title: "Mr. Ravi: A Life Shaped by the Sea",
    abstract:
      "Mr. Ravi recalls learning to fish as a child, surviving the transformation of North Penang’s coastline, and maintaining respect for the sea through decades of change.",
    abstractQuote:
      "The sea was not a background view. It was part of daily life.",
    author: "Ruohan",
    time: "2026-04-12",
  },
];
