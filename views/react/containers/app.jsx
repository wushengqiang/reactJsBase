import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import indexSelector from '../selectors/indexSelector'
import { Layout, Menu, Icon } from 'antd';
import { Link, IndexLink } from 'react-router'
import * as LayoutActions from "../actions/layout";
const { Sider, Content,Header } = Layout;
class App extends React.Component {

    constructor(props){
        super(props);
        this.eventToggleSidebar=this.eventToggleSidebar.bind(this);
    }

    eventToggleSidebar(e){
        e.preventDefault();
        this.props.toggleSidebar(!this.props.layout.collapsed);
    }


    renderAuthenticatedPage(){
        const {layout}=this.props;
        const {collapsed}=layout;
        return(
            <Layout  style={{height:'100%'}}>
                <Sider trigger={null}
                       collapsible collapsed={collapsed}  style={{height:'100%'}}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}  style={{height:'100%'}}>
                        <Menu.Item key="1">
                            <Icon type="desktop" />
                            <span className="nav-text">首页</span>
                            <IndexLink to="/" activeClassName="active"></IndexLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="qrcode" />
                            <span className="nav-text">二维码生成</span>
                            <Link to="/qr" activeClassName="active"></Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <span className="nav-text">登录</span>
                            <Link property="" to="/login"  activeClassName="active"></Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon className="trigger"
                            type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.eventToggleSidebar}
                        />
                    </Header>
                    <Content style={{background: '#fff'}}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }

    render() {
        const {isLogin}=this.props;
        return (
            <div style={{height:'100%'}}>
                {this.renderAuthenticatedPage()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        layout : state.layout,
        login:state.login,
        qr:state.qr
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(LayoutActions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);