import React, { useState } from 'react';
import { RegisterContext } from '@/config/context';
import SendMailPage from './SendMail';
import ActivatePage from './activation';
import RegisterForm from './register';

export enum RegisterSteps {
    REGISTER_FORM,
    SEND_MAIL,
    ACCOUNT_ACTIVATED,
}

const renderStepContent = (step: RegisterSteps) => {
    switch (step) {
        case RegisterSteps.REGISTER_FORM:
            return <RegisterForm />;
        case RegisterSteps.SEND_MAIL:
            return <SendMailPage />;
        case RegisterSteps.ACCOUNT_ACTIVATED:
            return <ActivatePage />;
        default:
            return <></>;
    }
};

const RegisterPage = () => {
    const [step, setStep] = useState(RegisterSteps.REGISTER_FORM);

    return (
        <RegisterContext.Provider value={{ step, setStep }}>
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {renderStepContent(step)}
            </div>
        </RegisterContext.Provider>
    );
};

export default RegisterPage;
