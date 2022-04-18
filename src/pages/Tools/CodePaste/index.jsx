import {GridContent} from "@ant-design/pro-layout";
import {Button, Card, Col, Row, Select} from "antd";
import {UnControlled as CodeMirror} from "react-codemirror2";
import React, {useState} from "react";
import 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css';
// 主题风格 https://codemirror.net/demo/theme.html#dracula
import 'codemirror/theme/solarized.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/theme/idea.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/monokai.css';
// 代码模式，clike 是包含java,c++等模式的
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/perl/perl.js';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/python/python';// python 代码高亮
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/shell/shell';// 用来做Shell代码高亮
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/lint/lint.js';  // 错误校验
import 'codemirror/addon/lint/lint.css'  // 代码错误提示
// 代码提示补全
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/sql-hint.js'; // 用来做SQL代码提示
import 'codemirror/addon/hint/anyword-hint.js';
import 'codemirror/addon/hint/html-hint';// html 自动提示
import 'codemirror/addon/hint/xml-hint';// xml 自动提示
import 'codemirror/addon/hint/javascript-hint'
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

const CodePaste = () => {
  const [codeData, setCodeData] = useState('');
  const [instance, setInstance] = useState(null);
  const {Option} = Select;
  const [codeTheme, setCodeTheme] = useState("dracula");
  const [codeType, setCodeType] = useState("text/x-java");

  function handleSelectChange(option) {
    setCodeTheme(option);
  }

  function handleSelectChange2(option) {
    setCodeType(option);
  }

  return(
    <GridContent>
      <Row gutter={24}>
        <Col lg={24} md={24} span={24}>
          <Card style={{marginTop: 20}}
                bordered={false}
                hoverable={true}
                title={
                  <Row>
                    <Col span={5} offset={11}>
                      <strong>代码主题：</strong>
                      <Select bordered={false} key={33333} defaultValue="dracula" style={{width: 120}}
                              onChange={handleSelectChange}>
                        <Option key={1} value="dracula">dracula</Option>
                        <Option key={2} value="solarized">solarized</Option>
                        <Option key={3} value="blackboard">blackboard</Option>
                        <Option key={4} value="eclipse">eclipse</Option>
                        <Option key={5} value="idea">idea</Option>
                        <Option key={5} value="monokai">monokai</Option>
                      </Select>
                    </Col>
                    <Col span={4}>
                      <strong>语言：</strong>
                      <Select bordered={false} key={1111} defaultValue="Java" style={{width: 120}}
                              onChange={handleSelectChange2}>
                        <Option key={11} value="text/x-java">Java</Option>
                        <Option key={12} value="python">
                          Python
                        </Option>
                        <Option key={13} value="text/javascript">
                          JavaScript
                        </Option>
                        <Option key={14} value="C++" disabled={true}>
                          C++
                        </Option>
                        <Option key={15} value="text/x-mysql">
                          SQL
                        </Option>
                        <Option key={16} value="application/json">
                          JSON
                        </Option>
                        <Option key={17} value="application/xml">
                          XML
                        </Option>
                        <Option key={18} value="text/css">
                          CSS
                        </Option>
                        <Option key={19} value="htmlmixed">
                          HTML
                        </Option>
                        <Option key={20} value="shell" disabled={true}>
                          命令行
                        </Option>
                      </Select>
                    </Col>
                    <Col span={2}>
                      <Button type={"primary"}>保存</Button>
                    </Col>
                    <Col span={2}>
                      <Button type={"default"}>分享</Button>
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
                editor.setSize('auto', '800px')
                editor.on("inputRead", function () {
                  // editor.on("cursorActivity", function () {
                  // 调用显示提示
                  editor.showHint();
                });
                setInstance(editor);
              }}
              options={{
                // 配置：https://www.cnblogs.com/minjh/p/15044706.html
                mode: {name: codeType, json: true},// 语言
                // mode: {name:'text/css'},
                lineNumbers: true, // 是否显示行号
                completeSingle: false,
                readOnly: false, // 是否只读
                // hintOptions: {hint: },
                // theme: 'blackboard',// 主题
                // theme: 'solarized dark',
                theme: codeTheme,
                autofocus: true,// 自动获取焦点
                styleActiveLine: true,// 光标代码高亮
                smartIndent: true,  // 自动缩进
                cursorHeight: 1,
                // start-设置支持代码折叠
                lineWrapping: true,// 是 否支持代码折叠
                foldGutter: true,
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],// end
                extraKeys: {
                  // "Alt": "autocomplete",
                  "Ctrl-S": function (editor) {
                    // editor.setValue(editor)
                    // that.codeSave(editor)
                  },
                  "Ctrl-Z": function (editor) {
                    editor.undo();
                  },// undo
                  "F8": function (editor) {
                    editor.redo();
                  },// Redo
                },
                matchBrackets: true,  // 括号匹配，光标旁边的括号都高亮显示
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
    </GridContent>
  );
}

export default CodePaste;
