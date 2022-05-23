import { Button, Card, Col, Drawer, Row, Select, Space, Tag } from 'antd';
import {
  CaretRightOutlined,
  CoffeeOutlined,
  FieldTimeOutlined,
  FileTextOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import { GridContent, PageContainer } from '@ant-design/pro-layout';

import './index.less';
import ProblemInfo from '@/pages/ScheduleStudy/components/ProblemInfo';
import CommentInfo from '@/pages/ScheduleStudy/components/CommentInfo';
import SolutionInfo from '@/pages/ScheduleStudy/components/SolutionInfo';
import CommitInfo from '@/pages/ScheduleStudy/components/CommitInfo';

import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css';
// 主题风格 https://codemirror.net/demo/theme.html#dracula
import 'codemirror/theme/solarized.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/theme/idea.css';
import 'codemirror/theme/eclipse.css';
// 代码模式，clike 是包含java,c++等模式的
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/perl/perl.js';
import 'codemirror/mode/clike/clike.js';
// ctrl+空格代码提示补全
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint.js'; // 错误校验
import 'codemirror/addon/lint/lint.css'; // 代码错误提示
import 'codemirror/addon/hint/anyword-hint.js';
// import 'codemirror/addon/hint/javascript-hint'
// 代码高亮
import 'codemirror/addon/selection/active-line'; // 当前行高亮
// 折叠代码
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchBrackets';

const AlgorithmDetail = () => {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState('bottom');
  const showDrawer = () => {
    setVisible(true);
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setVisible(false);
  };

  const [tabKey, setTabKey] = useState('problemInfo');
  const [codeData, setCodeData] = useState(
    'public class Test {\n' +
    '  /**\n' +
    '   * 姓名\n' +
    '   */\n' +
    '  private String name;\n' +
    '  \n' +
    '  /**\n' +
    '   * 年龄\n' +
    '   */\n' +
    '  public Integer age;\n' +
    '  \n' +
    '  /**\n' +
    '   * 薪资\n' +
    '   */\n' +
    '  protected Double money;\n' +
    '}',
  );
  const [instance, setInstance] = useState(null);
  const { Option } = Select;
  const [codeTheme, setCodeTheme] = useState('dracula');

  function handleSelectChange(option) {
    setCodeTheme(option);
  }

  const renderChildrenByTabKey = (tabValue) => {
    if (tabValue === 'problemInfo') {
      return <ProblemInfo />;
    }
    if (tabValue === 'commentInfo') {
      return <CommentInfo />;
    }
    if (tabValue === 'solutionInfo') {
      return <SolutionInfo />;
    }
    if (tabValue === 'commitInfo') {
      return <CommitInfo />;
    }
    return null;
  };

  return (
    <PageContainer
      onTabChange={(tab) => {
        setTabKey(tab);
      }}
      header={{
        title: '2. 两数相加',
        ghost: false,
        tags: [
          <Tag color={'green'} key={'11'}>
            简 单
          </Tag>,
          // <Tag color={"yellow"}>中 等</Tag>,
          // <Tag color={"red"}>困 难</Tag>,
        ],
      }}
      tabList={[
        {
          tab: [
            <span>
              <FileTextOutlined />
              问题
            </span>,
          ],
          key: 'problemInfo',
        },
        {
          tab: [
            <span>
              <CoffeeOutlined />
              评论
            </span>,
          ],
          key: 'commentInfo',
        },
        {
          tab: [
            <span>
              <SolutionOutlined />
              题解
            </span>,
          ],
          key: 'solutionInfo',
          // disabled: true,
        },
        {
          tab: [
            <span>
              <FieldTimeOutlined />
              提交记录
            </span>,
          ],
          key: 'commitInfo',
          // disabled: true,
        },
      ]}
      footer={[
        <Button type={'primary'} key={'111'} ghost>
          <CaretRightOutlined />
          执行代码
        </Button>,
        <Button type={'primary'} key={'222'} onClick={showDrawer}>
          提 交
        </Button>,
      ]}
    >
      <GridContent>
        <Row gutter={24}>
          <Col lg={24} md={24}>
            {renderChildrenByTabKey(tabKey)}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={24} md={24} span={24}>
            <Card
              style={{ marginTop: 20 }}
              bordered={false}
              hoverable={true}
              title={
                <Row>
                  <Col span={5} offset={15}>
                    <strong>代码主题：</strong>
                    <Select
                      bordered={false}
                      key={33333}
                      defaultValue="dracula"
                      style={{ width: 120 }}
                      onChange={handleSelectChange}
                    >
                      <Option key={1} value="dracula">
                        dracula
                      </Option>
                      <Option key={2} value="solarized">
                        solarized
                      </Option>
                      <Option key={3} value="blackboard">
                        blackboard
                      </Option>
                      <Option key={4} value="eclipse">
                        eclipse
                      </Option>
                      <Option key={5} value="idea">
                        idea
                      </Option>
                    </Select>
                  </Col>
                  <Col span={4}>
                    <strong>语言：</strong>
                    <Select
                      bordered={false}
                      key={1111}
                      defaultValue="Java"
                      style={{ width: 120 }}
                      onChange={handleSelectChange}
                    >
                      <Option key={11} value="Java">
                        Java
                      </Option>
                      <Option key={12} value="Python" disabled>
                        Python
                      </Option>
                      <Option key={13} value="JS" disabled>
                        JS
                      </Option>
                      <Option key={14} value="C++" disabled>
                        C++
                      </Option>
                    </Select>
                  </Col>
                </Row>
              }
            >
              {/* https://blog.csdn.net/qq_40550973/article/details/94922497   */}
              <CodeMirror
                // onCursorActivity={e => e.showHint() /*调用显示提示*/ }
                // editorDidMount={editor => { {instance = editor }}
                value={codeData}
                // editorDidAttach={editor => instance}
                editorDidMount={(editor) => {
                  editor.setSize('auto', '800px');
                  editor.on('inputRead', function () {
                    // editor.on("cursorActivity", function () {
                    // 调用显示提示
                    editor.showHint();
                  });
                  setInstance(editor);
                }}
                options={{
                  // 配置：https://www.cnblogs.com/minjh/p/15044706.html
                  mode: { name: 'text/x-java', json: true }, // 语言
                  // mode: {name:'text/css'},
                  lineNumbers: true, // 是否显示行号
                  completeSingle: false,
                  readOnly: false, // 是否只读
                  // hintOptions: {hint: },
                  // theme: 'blackboard',// 主题
                  // theme: 'solarized dark',
                  theme: codeTheme,
                  autofocus: true, // 自动获取焦点
                  styleActiveLine: true, // 光标代码高亮
                  smartIndent: true, // 自动缩进
                  cursorHeight: 1,
                  // start-设置支持代码折叠
                  lineWrapping: true, // 是 否支持代码折叠
                  foldGutter: true,
                  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'], // end
                  extraKeys: {
                    // "Alt": "autocomplete",
                    'Ctrl-S': function (editor) {
                      // editor.setValue(editor)
                      // that.codeSave(editor)
                    },
                    'Ctrl-Z': function (editor) {
                      editor.undo();
                    }, // undo
                    F8: function (editor) {
                      editor.redo();
                    }, // Redo
                  },
                  matchBrackets: true, // 括号匹配，光标旁边的括号都高亮显示
                  autoCloseBrackets: true, // 键入时将自动关闭()[]{}''""
                  lint: true, // 错误提示
                }}
                // onChange={this.codeOnChange}

                // 在失去焦点的时候触发，这个时候放数据最好
                // onBlur={this.codeOnBlur}

                // // 这个必须加上，否则在一些情况下，第二次打开就会有问题
                // //     onBeforeChange={(editor, data, value) => {
                // //       console.log("onBeforeChange fresh")
                // //       console.log(JSON.stringify(data));
                // //     }}
                //     /* HERE: pick out only the value. and might as well get name. */
              />
            </Card>
          </Col>
        </Row>
        <Drawer
          title="Drawer with extra actions"
          placement={placement}
          width={500}
          onClose={onClose}
          visible={visible}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" onClick={onClose}>
                OK
              </Button>
            </Space>
          }
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </GridContent>
    </PageContainer>
  );
};

export default AlgorithmDetail;
