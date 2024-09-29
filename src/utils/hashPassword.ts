import bcrypt from 'bcrypt'
export const hashPassword = async(password: string)=> {
    const salts = 10
    const hashedPassword = await bcrypt.hash(password, salts)
    return hashedPassword
}

export const comparePassword = async(password, hashedPassword)=> {
    const result = await bcrypt.compare(password, hashedPassword)
    return result
}