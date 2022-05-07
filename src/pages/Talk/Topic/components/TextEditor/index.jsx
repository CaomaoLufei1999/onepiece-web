import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Comment, Avatar, Input } from 'antd';

const TextEditor = () => {
  return (
    <Card>
      <Comment
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
          <Form>
            <Form.Item>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                // loading={submitting}
                // onClick={onSubmit}
                type="primary"
              >
                发布评论
              </Button>
            </Form.Item>
          </Form>
        }
      />
    </Card>
  );
};

export default TextEditor;
