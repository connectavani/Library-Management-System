import mongoose from 'mongoose';

const academicYearSchema = new mongoose.Schema(
    {
        year_label: {
            type: String,
            required: true,
        },
        start_date: {
            type: Date,
        },
        end_date: {
            type: Date,
        },
        status: {
            type: String,
            enum: ['Active', 'Inactive'],
        },
    },
    { timestamps: true },
);

const academicYearModel = mongoose.model('AcademicYear', academicYearSchema);

export default academicYearModel;
