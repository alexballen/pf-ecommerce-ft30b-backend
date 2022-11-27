const { DataTypes } = require('sequelize')
const {gunzipSync, gzipSync} = require('zlib')

module.exports = (sequelize) => {
    sequelize.define('address', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                const storedValue = this.getDataValue('country')
                const gzippedBuffer = Buffer.from(storedValue, 'base64')
                const unzippedBuffer = gunzipSync(gzippedBuffer)
                return unzippedBuffer.toString()
            },
            set(value) {
                const gzippedBuffer = gzipSync(value)
                this.setDataValue('country', gzippedBuffer.toString('base64'))
            }
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                const storedValue = this.getDataValue('street')
                const gzippedBuffer = Buffer.from(storedValue, 'base64')
                const unzippedBuffer = gunzipSync(gzippedBuffer)
                return unzippedBuffer.toString()
            },
            set(value) {
                const gzippedBuffer = gzipSync(value)
                this.setDataValue('street', gzippedBuffer.toString('base64'))
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
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
        houseNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            get() {
                const storedValue = this.getDataValue('houseNumber')
                const gzippedBuffer = Buffer.from(storedValue, 'base64')
                const unzippedBuffer = gunzipSync(gzippedBuffer)
                return unzippedBuffer.toString()
            },
            set(value) {
                const gzippedBuffer = gzipSync(value)
                this.setDataValue(
                    'houseNumber',
                    gzippedBuffer.toString('base64')
                )
            }
        },
        neighborhood: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                const storedValue = this.getDataValue('neighborhood')
                const gzippedBuffer = Buffer.from(storedValue, 'base64')
                const unzippedBuffer = gunzipSync(gzippedBuffer)
                return unzippedBuffer.toString()
            },
            set(value) {
                const gzippedBuffer = gzipSync(value)
                this.setDataValue(
                    'neighborhood',
                    gzippedBuffer.toString('base64')
                )
            }
        },
        zipCode: {
            type: DataTypes.INTEGER,
            allowNull: false,
            get() {
                const storedValue = this.getDataValue('zipCode')
                const gzippedBuffer = Buffer.from(storedValue, 'base64')
                const unzippedBuffer = gunzipSync(gzippedBuffer)
                return unzippedBuffer.toString()
            },
            set(value) {
                const gzippedBuffer = gzipSync(value)
                this.setDataValue('zipCode', gzippedBuffer.toString('base64'))
            }
        },
        fullAddress: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.street} ${this.houseNumber}, ${this.neightborhood}, ${this.city}, ${this.country}, ${this.zipCode}`
            }
        }
    })
}