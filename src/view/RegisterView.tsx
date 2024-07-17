import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, MessagePlugin } from "tdesign-react";
import FormItem from "tdesign-react/es/form/FormItem";
import { backend } from "../global";

export default function RegisterView(){
	const [mail, setMail] = useState('');
	const list: any[] = [];
	const navigate = useNavigate();
	const handleSubmit = (form: any) => {
		axios.post(backend + 'auth/register', form.fields)
			.then(res => {
				MessagePlugin.success('注册成功');
				localStorage.setItem('token', res.data.token);
				navigate('/');
			});
	};
	return <>
		<h1>第一步：发送验证邮件</h1>
		<Input onChange={setMail} placeholder="输入邮箱" />
		<Button onClick={() => {
			let message = MessagePlugin.loading('正在发送邮件，请稍候', 0);
			list.unshift(message);
			axios.post(backend + 'auth/sendEmailCode', {
				email: mail,
				usage: 'REGISTER'
			}).then(res => {
				MessagePlugin.success('发送成功，请检查收件箱');
				MessagePlugin.close(list.shift());
			})
		}}>发送验证邮箱</Button>
		<h1>第二步：填写注册信息</h1>
		<Form onSubmit={handleSubmit}>
			<FormItem name="username">
				<Input placeholder="用户名" />
			</FormItem>
			<FormItem name="email">
				<Input placeholder="邮箱" />
			</FormItem>
			<FormItem name="password">
				<Input placeholder="密码" />
			</FormItem>
			<FormItem name="code">
				<Input placeholder="验证码" />
			</FormItem>
			<FormItem>
        <Button theme="primary" type="submit" block>
          注册
        </Button>
      </FormItem>
		</Form>
	</>;
}
