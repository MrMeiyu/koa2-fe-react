import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import { SketchPicker } from 'react-color'
import { Icon, message, Layout, Avatar, Dropdown, Menu, } from 'antd'
import { loadScript } from '@utils/helpers'
import './index.less'

const { Header } = Layout

const _colors = [
  '#1f46e2',
  '#1890ff',
  '#00a6e2',
  '#5AB963',
  '#009688',
  '#ff9800',
  '#3f51b5',
  '#ee4781',
]

@withRouter
class AppHeader extends PureComponent {
  state = {
    sketchColor: '',
    displayColorPicker: false,
    user: 'admin',
    color: '#7265e6',
  }

  show = e => {
    if (e.target.className === 'change-color') {
      this.setState({
        displayColorPicker: true,
      })
    }
  }

  hide = e => {
    if (e.target.className === 'color-modal') {
      this.setState({
        displayColorPicker: false,
      })
    }
  }

  loginOut = () => {
    console.log(this.props, '----');
    Cookies.set('token', '')
    global.nav(this.props, '/login')
  }

  /**
   * @description 获取取色器的颜色
   * @returns hex 16进制的颜色
   */
  onChangeComplete = color => {
    const { hex } = color
    this.setState({
      sketchColor: hex,
    })
    const { sketchColor } = this.state
    const changeColor = () => {
      window.less
        .modifyVars({
          '@primary-color': sketchColor,
        })
        .then(() => {
          localStorage.setItem('themeColor', sketchColor)
          Icon.setTwoToneColor({ primaryColor: sketchColor })
          message.success('修改主题颜色成功')
        })
    }

    window.less = {
      async: true,
      javascriptEnabled: true,
    }

    loadScript('/lib/less.min.js').then(() => {
      changeColor()
    })
  }

  render() {
    const { sketchColor, displayColorPicker, user, color, } = this.state
    const _bgColor = localStorage.getItem('themeColor')
    const _menu = (
      <Menu>
        <Menu.Item>
          <span onClick={() => this.loginOut()}>登出</span>
        </Menu.Item>
      </Menu>
    )
    return (
      <Header className="app-header">
        <div className="color-wrapper">
          <div className="change-color-box" onClick={this.show}>
            <div
              className="change-color"
              style={{
                backgroundColor: sketchColor || _bgColor,
              }}
            />
            {displayColorPicker ? (
              <div className="color-modal" onClick={this.hide}>
                <SketchPicker
                  disableAlpha
                  color={sketchColor}
                  presetColors={_colors}
                  onChangeComplete={this.onChangeComplete}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="avatar-wrapper">
          <Dropdown overlay={_menu}>
            <div>
              <Avatar className="avatar" style={{ backgroundColor: color, }} size="large">
                {user}
              </Avatar>
              <Icon type="down" />
            </div>
          </Dropdown>
        </div>
      </Header>
    )
  }
}

export default AppHeader
