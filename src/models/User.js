const { DataTypes } = require('sequelize')
const {gunzipSync, gzipSync} = require('zlib')

module.exports = (sequelize) => {
    sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true,
                allowNull: false,
                unique: true
            },
            firstName: {
                type: DataTypes.TEXT,
                get() {
                    const storedValue = this.getDataValue('firstName')
                    const gzippedBuffer = Buffer.from(storedValue, 'base64')
                    const unzippedBuffer = gunzipSync(gzippedBuffer)
                    return unzippedBuffer.toString()
                },
                set(value) {
                    const gzippedBuffer = gzipSync(value)
                    this.setDataValue(
                        'firstName',
                        gzippedBuffer.toString('base64')
                    )
                }
            },
            lastName: {
                type: DataTypes.TEXT,
                get() {
                    const storedValue = this.getDataValue('lastName')
                    const gzippedBuffer = Buffer.from(storedValue, 'base64')
                    const unzippedBuffer = gunzipSync(gzippedBuffer)
                    return unzippedBuffer.toString()
                },
                set(value) {
                    const gzippedBuffer = gzipSync(value)
                    this.setDataValue(
                        'lastName',
                        gzippedBuffer.toString('base64')
                    )
                }
            },
            fullName: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `${this.firstName} ${this.lastName}`
                }
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true
                },
                allowNull: false,
                unique: true
            },
            phoneNumber: {
                type: DataTypes.STRING,
                get() {
                    const storedValue = this.getDataValue('phoneNumber')
                    const gzippedBuffer = Buffer.from(storedValue, 'base64')
                    const unzippedBuffer = gunzipSync(gzippedBuffer)
                    return unzippedBuffer.toString()
                },
                set(value) {
                    const gzippedBuffer = gzipSync(value)
                    this.setDataValue(
                        'phoneNumber',
                        gzippedBuffer.toString('base64')
                    )
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    const storedValue = this.getDataValue('password')
                    const gzippedBuffer = Buffer.from(storedValue, 'base64')
                    const unzippedBuffer = gunzipSync(gzippedBuffer)
                    return unzippedBuffer.toString()
                },
                set(value) {
                    const gzippedBuffer = gzipSync(value)
                    this.setDataValue(
                        'password',
                        gzippedBuffer.toString('base64')
                    )
                }
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: true,
                get() {
                    const storedValue = this.getDataValue('city')
                    const gzippedBuffer = Buffer.from(storedValue, 'base64')
                    const unzippedBuffer = gunzipSync(gzippedBuffer)
                    return unzippedBuffer.toString()
                },
                set(value) {
                    const gzippedBuffer = gzipSync(value)
                    this.setDataValue('city', gzippedBuffer.toString('base64'))
                }
            },
            country: {
                type: DataTypes.STRING,
                allowNull: true,
                get() {
                    const storedValue = this.getDataValue('country')
                    const gzippedBuffer = Buffer.from(storedValue, 'base64')
                    const unzippedBuffer = gunzipSync(gzippedBuffer)
                    return unzippedBuffer.toString()
                },
                set(value) {
                    const gzippedBuffer = gzipSync(value)
                    this.setDataValue(
                        'country',
                        gzippedBuffer.toString('base64')
                    )
                }
            },
            isBan: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            timestamp: true,
            createdAt: 'unitedAt',
            updatedAt: 'modifyAt'
        }
    )
}