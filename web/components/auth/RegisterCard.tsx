import { MessageContext } from '@/context/messageContext';
import authService, { RegisterRequestDto } from '@/services/auth.service';
import userSlice, { setUser } from '@/store/userSlice';
import tokenService from '@/utils/tokenService';
import { Card, Col, InputNumber, Input, Button } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import * as Yup from 'yup';
export interface RegisterCardProps {
    setKey: React.Dispatch<React.SetStateAction<string>>;
}

export interface formModel {
    email: string;
    password: string;
    checkPassword: string;
    name: string;
}

export default function RegisterCard({ setKey }: RegisterCardProps) {
    const messageAPI = useContext(MessageContext);

    const validationSchema = Yup.object({
        email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
        name: Yup.string().required('Tên không được để trống'),
        password: Yup.string().required('Mật khẩu không được để trống'),
        checkPassword: Yup.string()
            .required('Không được trống')
            .equals([Yup.ref('password'), null], 'Mật khẩu không khớp'),
    });

    const router = useRouter();

    const submit = async (values: formModel) => {
        try {
            const res = await authService.register(values as RegisterRequestDto);
            const { data } = res;

            tokenService.accessToken = data.accessToken;
            tokenService.refreshToken = data.refreshToken;
            tokenService.expiratedAt = data.expiredAt;
            messageAPI?.open({
                type: 'success',
                content: 'Đăng ký thành công!',
            });
            setUser(data);
            router.push('/');
        } catch (err: any) {
            messageAPI?.open({
                type: 'error',
                content: err.message,
            });
        }
    };
    return (
        <Col span={14} className="mt-5">
            <Card title={<h1 style={{ textAlign: 'center' }}>Đăng Ký</h1>}>
                <div className="p-5">
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            checkPassword: '',
                            name: '',
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
                                    label="Tên"
                                    validateStatus={errors.name ? 'error' : 'validating'}
                                    required
                                >
                                    <Input
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        placeholder="Nhập tên..."
                                    />
                                    <p style={{ color: 'red', fontWeight: 300, marginTop: 2 }}>
                                        {errors.name}
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
                                <FormItem
                                    labelCol={{ span: 8 }}
                                    labelAlign="left"
                                    label="Nhập lại mật khẩu"
                                    validateStatus={errors.checkPassword ? 'error' : 'validating'}
                                    required
                                >
                                    <Input
                                        type="password"
                                        name="checkPassword"
                                        value={values.checkPassword}
                                        onChange={handleChange}
                                        placeholder="Nhập mật khẩu..."
                                    />
                                    <p style={{ color: 'red', fontWeight: 300, marginTop: 2 }}>
                                        {errors.checkPassword}
                                    </p>
                                </FormItem>
                                <div className="flex justify-end" style={{ justifyContent: 'end' }}>
                                    <Button htmlType="submit" type="primary">
                                        Đăng Ký
                                    </Button>
                                    <Button onClick={() => setKey('login')} type="link">
                                        Hoặc đăng nhập
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
