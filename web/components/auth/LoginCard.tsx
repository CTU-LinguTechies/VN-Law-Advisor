import { MessageContext } from '@/context/messageContext';
import authService, { LoginRequestDto } from '@/services/auth.service';
import { setUser } from '@/store/userSlice';
import tokenService from '@/utils/tokenService';
import { Card, Col, InputNumber, Input, Button } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import * as Yup from 'yup';

export interface LoginCardProps {
    setKey: React.Dispatch<React.SetStateAction<string>>;
}

export default function LoginCard({ setKey }: LoginCardProps) {
    const messageAPI = useContext(MessageContext);
    const validationSchema = Yup.object({
        email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
        password: Yup.string().required('Mật khẩu không được để trống'),
    });
    const router = useRouter();
    const dispatch = useDispatch();
    const submit = async (values: LoginRequestDto) => {
        try {
            const { data } = await authService.login(values);
            tokenService.accessToken = data.accessToken;
            tokenService.refreshToken = data.refreshToken;
            tokenService.expiratedAt = data.expiredAt;
            dispatch(setUser(data));
            router.push('/');
            messageAPI?.open({
                type: 'success',
                content: 'Đăng nhập thành công',
            });
        } catch (err: any) {
            messageAPI?.open({
                type: 'error',
                content: err.message,
            });
        }
    };

    return (
        <Col span={14} className="mt-5">
            <Card title={<h1 style={{ textAlign: 'center' }}>Đăng Nhập</h1>}>
                <div className="p-5">
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={submit}
                    >
                        {({ handleChange, handleSubmit, values, errors }) => (
                            <form onSubmit={handleSubmit}>
                                <FormItem
                                    labelCol={{ span: 8 }}
                                    labelAlign="left"
                                    label="Email"
                                    validateStatus={errors.email ? 'error' : 'validating'}
                                    required
                                >
                                    <Input
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        placeholder="Nhập email..."
                                    />
                                    <p style={{ color: 'red', fontWeight: 300, marginTop: 2 }}>
                                        {errors.email}
                                    </p>
                                </FormItem>
                                <FormItem
                                    labelCol={{ span: 8 }}
                                    labelAlign="left"
                                    label="Mật khẩu"
                                    validateStatus={errors.email ? 'error' : 'validating'}
                                    required
                                >
                                    <Input
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        placeholder="Nhập mật khẩu..."
                                    />
                                    <p style={{ color: 'red', fontWeight: 300, marginTop: 2 }}>
                                        {errors.password}
                                    </p>
                                </FormItem>
                                <div className="flex justify-end" style={{ justifyContent: 'end' }}>
                                    <Button htmlType="submit" type="primary">
                                        Đăng Nhập
                                    </Button>
                                    <Button onClick={() => setKey('register')} type="link">
                                        Hoặc đăng ký
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </Card>
        </Col>
    );
}
