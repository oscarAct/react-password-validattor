declare module 'react-password-validattor' {

    export declare type RuleNames = 'number' | 'minLength' | 'maxLength' | 'specialChar' | 'lowercase' | 'capital' | 'matches' | 'shouldNotContain' | 'notEmpty';
    
    export declare interface Configuration {
        customText?: {
            minLength?: {
                successText?: string;
                errorText?: string;
            },
            maxLength?: {
                successText?: string;
                errorText?: string;
            },
            specialChar?: {
                successText?: string;
                errorText?: string;
            },
            number?: {
                successText?: string;
                errorText?: string;
            },
            capital?: {
                successText?: string;
                errorText?: string;
            },
            matches?: {
                successText?: string;
                errorText?: string;
            },
            lowercase?: {
                successText?: string;
                errorText?: string;
            },
            notEmpty?: {
                successText?: string;
                errorText?: string;
            },
            shouldNotContain?: {
                successText?: string;
                errorText?: string;
            },
        };
        showProgressBar?: boolean;
        showPasswordSuggestion?: boolean;
        classNames?: {
            containerClass?: string;
            gridClass?: string;
            ruleClass?: string;
            validProgressBarClass?: string;
            invalidProgressBarClass?: string;
        }
    }

    export interface PasswordValidattorProps {
        rules: Array<RuleNames>;
        minLength?: number;
        maxLength?: number;
        password: string;
        confirmedPassword?: string;
        forbiddenWords?: Array<string, number>;
        /**
         * 
         * @param boolean validatorStatus
         * @returns 
         */
        onValidatorChange?: (status: boolean) => any;
        iconSize?: number;
        config?: Configuration;
    }
    
      const PasswordValidattor: React.FC<PasswordValidattorProps>;
      export default PasswordValidattor;
}