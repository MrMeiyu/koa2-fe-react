import React, { PureComponent } from 'react';
import { SketchPicker } from 'react-color';
import { Icon, message, Layout, } from 'antd';
import { loadScript } from '@utils/helpers';
import ColorImgUrl from '@assets/img/主题.png';
import './index.less';

const { Header, } = Layout;

const _colors = [
  '#1f46e2',
  '#1890ff',
  '#00a6e2',
  '#5AB963',
  '#009688',
  '#ff9800',
  '#3f51b5',
  '#ee4781',
];

class AppHeader extends PureComponent {
  state = {
    sketchColor: '',
    displayColorPicker: false,
  };

  show = e => {
    this.setState({
      displayColorPicker: true,
    });
    if (e.target.className === 'change-color') {
    }
  };

  hide = e => {
    if (e.target.className === 'color-modal') {
      this.setState({
        displayColorPicker: false,
      });
    }
  };

  /**
   * @description 获取取色器的颜色
   * @returns hex 16进制的颜色
   */
  onChangeComplete = color => {
    const { hex } = color;
    this.setState({
      sketchColor: hex,
    });
    const { sketchColor } = this.state;
    const changeColor = () => {
      window.less
        .modifyVars({
          '@primary-color': sketchColor,
        })
        .then(() => {
          localStorage.setItem('themeColor', sketchColor);
          Icon.setTwoToneColor({ primaryColor: sketchColor });
          message.success('修改主题颜色成功');
        });
    };

    window.less = {
      async: true,
      javascriptEnabled: true,
    };

    loadScript('/lib/less.min.js').then(() => {
      changeColor();
    });
  };

  render() {
    const { sketchColor, displayColorPicker } = this.state;
    return (
      <Header className="header-wrapper">
        <div className="color-wrapper">
          <div className="change-color-box" onClick={this.show}>
            <img className="change-color" src={ColorImgUrl} alt="" />
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
      </Header>
    );
  }
}

export default AppHeader;
