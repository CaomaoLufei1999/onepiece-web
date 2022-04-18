import {Editor} from "@bytemd/react";
// 引入中文包
import zhHans from "bytemd/locales/zh_Hans.json";
import gfm from "@bytemd/plugin-gfm";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import breaks from "@bytemd/plugin-breaks";
import footnotes from "@bytemd/plugin-footnotes";
import frontmatter from "@bytemd/plugin-frontmatter";
import math from "@bytemd/plugin-math-ssr";
import mermaid from "@bytemd/plugin-mermaid";
import "bytemd/dist/index.min.css";
import "highlight.js/styles/vs.css";
import "./index.less"
// 主题
import 'juejin-markdown-themes/dist/condensed-night-purple.min.css';
import 'juejin-markdown-themes/dist/condensed-night-purple';

import React, {useState} from "react";
import {GridContent, PageContainer} from "@ant-design/pro-layout";
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Form,
  Input,
  Modal,
  PageHeader,
  Row,
  Skeleton,
  Statistic,
  Tag,
  Radio, Select,
  Switch
} from "antd";
import {
  EyeFilled, LikeFilled, StarFilled,
  SwapOutlined,
} from "@ant-design/icons";
import styles from "@/pages/Home/index.less";

const plugins = [gfm(), gemoji(), highlight(), mediumZoom(), breaks(), footnotes(), frontmatter(), math(), mermaid()];

const ArticleEditor = () => {
  const {TextArea} = Input;
  const {Option} = Select;
  const [value, setValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const [isChecked,setIsChecked] = useState(true)
  const [category,setCategory] = useState("c")

  const children = [
    <Option key={"tag1" + 1}>{"Java"}</Option>,
    <Option key={"tag2" + 2}>{"JavaScript"}</Option>,
    <Option key={"tag3" + 3}>{"Vue"}</Option>,
    <Option key={"tag4" + 4}>{"React"}</Option>,
    <Option key={"tag5" + 5}>{"MySQL"}</Option>,
    <Option key={"tag6" + 6}>{"Spring"}</Option>,
    <Option key={"tag7" + 7}>{"Spring Boot"}</Option>,
    <Option key={"tag8" + 8}>{"Spring MVC"}</Option>,
    <Option key={"tag9" + 9}>{"Mybatis"}</Option>,
    <Option key={"tag10" + 10}>{"Redis"}</Option>,
    <Option key={"tag11" + 11}>{"ElasticSearch"}</Option>,
    <Option key={"tag12" + 12}>{"Oracle"}</Option>,
    <Option key={"tag13" + 13}>{"HTML"}</Option>,
    <Option key={"tag14" + 14}>{"Python"}</Option>,
    <Option key={"tag15" + 15}>{"C++"}</Option>,
  ];

  const children2 = [
    <Option key={"tag111" + 1}>{"#算法题#001.两数之和#"}</Option>,
    <Option key={"tag222" + 2}>{"#SQL题#020.联表查询#"}</Option>,
    <Option key={"tag333" + 3}>{"#程序题#022.手写火车票#"}</Option>,
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  const switchOnChange = (checked) => {
    setIsChecked(checked);
  }
  const tagRender = (props) => {
    const {label, value, closable, onClose} = props;
    const onPreventMouseDown = event => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={"green"}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{marginRight: 3}}
      >
        {label}
      </Tag>
    );
  }

  const tagRender2 = (props) => {
    const {label, value, closable, onClose} = props;
    const onPreventMouseDown = event => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={"yellow"}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{marginRight: 3}}
      >
        {label}
      </Tag>
    );
  }

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setIsModalVisible(false);
      setLoading(false);
    }, 3000);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCategoryChange = (obj) => {
    setCategory(obj.target.value);
  }

  return (
    <PageContainer
      header={
        {
          onBack: {},
          title: "内容管理",
          subTitle: "show time",
          ghost: false,
          extra: [
            <Button key="34"><SwapOutlined/>切换富文本编辑器</Button>,
            <Button key="23">保存草稿</Button>,
            <Button key="21" type="primary" onClick={showModal}> 发布文章
            </Button>
          ]
        }
      }
      content={
        <Form
          layout={"inline"}
          className="one"
          form={form}
          // onFinish={handleSubmit}
          initialValues={{title: ""}}
        >
          <Row style={{width: "100%"}} wrap={true} align={"middle"}>
            <Col span={20} offset={2}>
              <Form.Item fieldKey={"title"} name={"title"}>
                <Input
                  placeholder={"请输入文章标题..."}
                  className="title-input"
                  showCount
                  maxLength={100}
                  size={"large"}
                  bordered={false}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      }
    >
      <GridContent>
        <Row gutter={0}>
          <Col lg={24} md={24}>
            {/* 插件地址：https://github.com/bytedance/bytemd */}
            <Editor
              locale={zhHans}
              // 内部的值
              value={value}
              // 插件
              plugins={plugins}
              // 动态修改值
              onChange={v => setValue(v)}
              placeholder={"开始你的创作吧！"}
            />
          </Col>
        </Row>
        <Modal
          title={<strong>发布文章</strong>}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
          footer={[
            <Button key="back11" onClick={handleCancel}>
              取 消
            </Button>,
            <Button
              key="000"
              href="https://google.com"
              type="default"
              loading={loading}
              onClick={handleOk}
            >
              存为草稿
            </Button>,
            <Button
              key="1111"
              href="https://google.com"
              type="primary" danger ghost
              loading={loading}
              onClick={handleOk}
            >
              定时发布
            </Button>,
            <Button
              key="2222"
              href="https://google.com"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              发 布
            </Button>
          ]}
        >
          <Form form={form}>
            <Row>
              <Col span={24}>
                <Form.Item fieldKey={"category"} label={"文章分类"} name={"category"}
                           rules={[{required: true, message: '文章分类不能为空!'}]}>
                  <Radio.Group buttonStyle="solid" defaultValue={"c"} onChange={handleCategoryChange}>
                    <Radio.Button value="a">后端</Radio.Button>
                    <Radio.Button value="b">前端</Radio.Button>
                    <Radio.Button value="c">算法(题解)</Radio.Button>
                    <Radio.Button value="cc">数据库</Radio.Button>
                    <Radio.Button value="d">程序人生</Radio.Button>
                    <Radio.Button value="dd">学习笔记</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            {
              category === 'c'?
                <Row>
                  <Col span={12}>
                    <Form.Item fieldKey={"tags"} label={"文章标签"} name={"tags"}
                               rules={[{required: true, message: '文章标签不能为空!'}]}>
                      <Select
                        bordered={false}
                        tagRender={tagRender}
                        mode="multiple"
                        allowClear
                        style={{width: '100%'}}
                        placeholder="请选择文章标签"
                        // defaultValue={[]}
                        onChange={handleChange}
                      >
                        {children}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item fieldKey={"tags2"} label={"关联题目"} name={"tags2"}
                               rules={[{required: true, message: '关联题目不能为空!'}]}>
                      <Select
                        bordered={false}
                        tagRender={tagRender2}
                        allowClear
                        style={{width: '100%'}}
                        placeholder="请选择关联题目"
                        // defaultValue={[]}
                        // onChange={handleChange}
                      >
                        {children2}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                :
                <Row>
                  <Col span={24}>
                    <Form.Item fieldKey={"tags"} label={"文章标签"} name={"tags"}
                               rules={[{required: true, message: '文章标签不能为空!'}]}>
                      <Select
                        bordered={false}
                        tagRender={tagRender}
                        mode="multiple"
                        allowClear
                        style={{width: '100%'}}
                        placeholder="请选择文章标签"
                        // defaultValue={[]}
                        onChange={handleChange}
                      >
                        {children}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
            }

            <Row>
              <Col span={24}>
                <Form.Item fieldKey={"isOriginal"} label={"是否原创"} name={"isOriginal"}>
                  <Switch onChange={switchOnChange}checked={isChecked}/>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item fieldKey={"description"} label={"文章概述"} name={"description"}
                           rules={[{required: true, message: '文章概述不能为空!'}]}>
                  <TextArea bordered={true} rows={4} placeholder="请简要描述文章概要..." maxLength={200}/>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </GridContent>
    </PageContainer>
  )
};

export default ArticleEditor;
