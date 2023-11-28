import { Card, Col, InputNumber, Input, Button } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Formik } from 'formik';

import * as Yup from 'yup';
export interface RegisterCardProps {
    setKey: React.Dispatch<React.SetStateAction<string>>;
}

export default function RegisterCard({ setKey }: RegisterCardProps) {
    const validationSchema = Yup.object({
        email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
        ten: Yup.string().required('Tên không được để trống'),
        password: Yup.string().required('Mật khẩu không được để trống'),
        checkPassword: Yup.string()
            .required('Không được trống')
            .equals([Yup.ref('password'), null], 'Mật khẩu không khớp'),
    });

    const submit = async (values: any) => {
        console.log(values);
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
                            ten: '',
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
                                    validateStatus={errors.ten ? 'error' : 'validating'}
                                    required
                                >
                                    <Input
                                        name="ten"
                                        value={values.ten}
                                        onChange={handleChange}
                                        placeholder="Nhập tên..."
                                    />
                                    <p style={{ color: 'red', fontWeight: 300, marginTop: 2 }}>
                                        {errors.ten}
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
                                    <Button onClick={() => setKey('register')} type="link">
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
