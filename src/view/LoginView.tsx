import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DesktopIcon, LockOnIcon } from "tdesign-icons-react";
import { Button, Form, Input, MessagePlugin } from "tdesign-react";
import FormItem from "tdesign-react/es/form/FormItem";
import { backend } from "../global";

export default function LoginView(){
  const navigate = useNavigate();
  const onSubmit = (form: any) => {
    axios.post(backend + 'auth/login',
      /^\w+(-+.\w+)*@\w+(-.\w+)*.\w+(-.\w+)*$/.exec(form.fields.account)?
      {
        email: form.fields.account,
        password: form.fields.password
      }:{
        id: form.fields.account,
        password: form.fields.password
    }).then(res => {
      MessagePlugin.success('登录成功');
      localStorage.setItem('token', res.data.token);
      navigate('/');
    }).catch(err => {
      MessagePlugin.error('登录失败');
    });
  }
  return <>
    <h1>注册</h1>
    <Form statusIcon onSubmit={onSubmit} colon={true} labelWidth={0}>
      <FormItem name="account">
        <Input clearable={true} prefixIcon={<DesktopIcon />} placeholder="请输入账户 id 或邮箱" />
      </FormItem>
      <FormItem name="password">
        <Input type="password" prefixIcon={<LockOnIcon />} clearable={true} placeholder="请输入密码" />
      </FormItem>
      <FormItem>
        <Button theme="primary" type="submit" block>
          登录
        </Button>
      </FormItem>
    </Form>
  </>;
}
