import { backend } from "@/global";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, MessagePlugin } from "tdesign-react";
import FormItem from "tdesign-react/es/form/FormItem";

export default function SendPostView(){
	const navigate = useNavigate();
	return <>
		<Form onSubmit={e => {
			axios.post(backend + 'post/new', {
				title: e.fields.title,
				content: e.fields.content,
				anonymous: false,
				block: 1,
				top: false
			}, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
				.then(res => {
					MessagePlugin.success('发送成功');
					navigate('/post/' + res.data.post);
				})
				.catch(err => {
					MessagePlugin.error('发送失败');
				});
		}}>
			<FormItem name='title'>
				<Input placeholder="标题"/>
			</FormItem>
			<FormItem name='content'>
				<Input placeholder="内容" />
			</FormItem>
			<FormItem>
				<Button type="submit">发帖</Button>
			</FormItem>
		</Form>
	</>;
}
