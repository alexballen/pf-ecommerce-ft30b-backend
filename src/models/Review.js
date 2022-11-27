const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('review', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        rating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            },
            allowNull: false,
            get() {
                const storedValue = this.getDataValue('rating')
                const gzippedBuffer = Buffer.from(storedValue, 'base64')
                const unzippedBuffer = gunzipSync(gzippedBuffer)
                return unzippedBuffer.toString()
            },
            set(value) {
                const gzippedBuffer = gzipSync(value)
                this.setDataValue('rating', gzippedBuffer.toString('base64'))
            }
        },
        description: {
            type: DataTypes.TEXT,
            get() {
                const storedValue = this.getDataValue('description')
                const gzippedBuffer = Buffer.from(storedValue, 'base64')
                const unzippedBuffer = gunzipSync(gzippedBuffer)
                return unzippedBuffer.toString()
            },
            set(value) {
                const gzippedBuffer = gzipSync(value)
                this.setDataValue(
                    'description',
                    gzippedBuffer.toString('base64')
                )
            }
        }
    })
}