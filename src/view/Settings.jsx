import { backend, language, OPTIONS } from "@/global";
import axios from "axios";
import { useEffect, useState } from "react";
import { MessagePlugin, SelectInput } from "tdesign-react";

export default function Settings(){
	const [loaded, setLoaded] = useState(false);
	const [user, setUser] = useState({});

	useEffect(() => {
		if(!loaded)
			axios.get(backend + 'user/info/0',{headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
				.then(res => {
					setUser(res.data);
					setLoaded(true);
				})
				.catch(err => {
					MessagePlugin.error('获取用户数据失败');
				});
	})

	return <>
		<br />
		用户名：{user.username}
		<br />
		邮箱：{user.email}
		<br />
		注册时间：{new Date(user.registrationTime).toLocaleString()}
		<br />
		介绍：{user.introduction}
		<br />
		母语：{language[user.firstLanguage]}
		<br />
		学习语言：{language[user.learningLanguage]}
		<br />
		切换母语
		<SelectInput
			panel={OPTIONS.map(e => <li key={e.value} onClick={() => {
				axios.post(backend + 'user/firstLanguage?language=' + e.value, {}, {
					headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
				})
					.then(res => {
						MessagePlugin.success('切换母语为' + e.label + '成功');
						setLoaded(false);
					})
					.catch(err => {
						MessagePlugin.error('切换母语失败');
					});
			}}>
				{e.label}
			</li>)}
		/>
		切换学习语言
		<SelectInput
			panel={OPTIONS.map(e => <li key={e.value} onClick={() => {
				axios.post(backend + 'user/learningLanguage?language=' + e.value, {}, {
					headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
				})
					.then(res => {
						MessagePlugin.success('切换学习语言为' + e.label + '成功');
						setLoaded(false);
					})
					.catch(err => {
						MessagePlugin.error('切换学习语言失败');
					});
			}}>
				{e.label}
			</li>)}
		/>
	</>;
}
