import React, {useCallback, useEffect, useState} from "react";
import {useAppContext} from "contexts/AppContext";
import {requestLogin} from "api/UserAPI";
import {Button, Form, Icon, Input, Spin} from "antd";
import {concat} from "lodash";
import {Redirect} from "react-router-dom";


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


function LoginPage({ form, location }) {
  const { actions: { setJwtToken } } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState();

  useEffect(() => {
    form.validateFields();
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    setIsLoading(true);

    form.validateFields((error, fieldValues) => {
      if (!error) {
        requestLogin({ data: fieldValues })
          .then(({ errors, jwtToken }) => {
            if ( errors ) {
              const usernameErrors = errors['username'];
              form.setFields({
                password:{
                  value: fieldValues['username'],
                  errors: usernameErrors,
                }
              });

              // FIXME: antd에서는 __all__ 에러를 어떻게 처리하면 좋을까?
              const passwordErrors = concat(errors['password'] || [], errors['__all__'] || [])
                .map(errorMessage => new Error(errorMessage));

              form.setFields({
                password: {
                  value: fieldValues['password'],
                  errors: passwordErrors,
                }
              });
            }
            else if ( jwtToken ) {
              setJwtToken(jwtToken);
              const { state: { from }} = location;
              setRedirectTo(from);
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    });
  }, []);

  if ( redirectTo ) {
    return <Redirect to={redirectTo} />;
  }

  const errorMessages = {
    username: form.isFieldTouched('username') && form.getFieldError('username'),  // undefined or array
    password: form.isFieldTouched('password') && form.getFieldError('password'),
  };

  return (
    <div>
      Login Page

      <Form onSubmit={onSubmit}>
        <Form.Item label="Username"
                   validateStatus={errorMessages.username && "error"}
                   help={errorMessages.username}>
          {form.getFieldDecorator('username', {
            rules: [
              { required: true, message: 'Please input your username!'}
            ]
          })(
            <Input type="text"
                   name="username"
                   // onChange={onChange}
                   // value={inputState.username}
                   prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                   autoComplete={"off"}
                   placeholder="username" />
          )}
        </Form.Item>
        <Form.Item label="Password"
                   hasFeedback
                   validateStatus={errorMessages.password && "error"}
                   help={errorMessages.password}>
          {form.getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your password!' }
            ]
          })(
            <Input.Password name="password"
                            // onChange={onChange}
                            // value={inputState.password}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                            placeholder="password" />
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary"
                  htmlType="submit"
                  disabled={hasErrors(form.getFieldsError())}>
            {isLoading && <Spin />}
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Form.create({ name: 'login-form' })(LoginPage);
