import Joi from "joi";

const signupSchema = Joi.object({
    name: Joi.string().required().regex(/^[a-zA-Z]+[0-9]*$/),       // name can be a username and hence should start with alphabets and can contain numbers, just not at the first position.
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const validateSignupSchema = (req, res, next) => {
    const {error} = signupSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
            message:'The input fields are of invalid format.',
            error: error.details[0]
        });
    }
    next();
}


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const validateLoginSchema = (req, res, next) => {
    const {error} = loginSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
            message:'The input fields are of invalid format.',
            error: error.details[0]
        });
    }
    next();
}

const taskSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string()
});

export const validateTaskSchema = (req, res, next) => {
    const {error} = taskSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
            message:'The input fields are of invalid format.',
            error: error.details[0]
        });
    }
    next();
}