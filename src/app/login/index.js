import React, { Component, } from 'react'
import { Form, Input, Icon, Button, } from 'antd'
import Cookies from 'js-cookie'

import './index.less'
@Form.create()

class Login extends Component {
  render() {
    const { form: { getFieldDecorator, }} = this.props
    return (
      <div className="login-wrapper">
        <div className="login-box">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your userName!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="userName"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('psd', {
                rules: [{ required: true, message: 'Please input your psd!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="psd"
                  placeholder="psd"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }

  onReload = () => {
    this.state({
      url: '',
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        window.Post('/login', values).then(r => {
          if (r.code === 200) {
            Cookies.set('token', r.data.token)
            global.nav(this.props, '/layout')
          }
        }).catch((err) => {
          console.warn(err, 'err')
        })
      }
    })
  }
}

export default Login