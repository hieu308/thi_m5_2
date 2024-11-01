import React, {useState, useEffect} from "react";
import {Form, Button} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Formik, Field, Form as FormikForm, ErrorMessage} from "formik";
import {toast} from "react-toastify";
import * as Yup from "yup";

function AddBook() {
    const navigate = useNavigate();
    const [categories, setCategory] = useState([]);
const [books, setBook] = useState("");
    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await axios.get("http://localhost:3070/book");
                setBook(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:3070/category");
                setCategory(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        getBooks();
        fetchCategories();
    }, []);

    const validationSchema = Yup.object().shape({
        code: Yup.string()
            .matches(/^BO-\d{4}$/, 'Mã sách phải có định dạng BO-XXXX với XX là số.').required(),
        name: Yup.string()
            .min(2, 'Tên sách phải có ít nhất 2 ký tự.')
            .max(100, 'Tên sách không được vượt quá 100 ký tự.')
            .required('Tên sách là bắt buộc.'),
        quantity: Yup.number()
            .min(1, 'Số lượng phải lớn hơn 1.')
            .max(1000, 'Số lượng không được vượt quá 1000.')
            .required('Số lượng là bắt buộc.'),
        category: Yup.string().required('Thể loại là bắt buộc.'),

        day: Yup.date()
            .max(new Date(), 'Ngày nhập phải nhỏ hơn hoặc bằng ngày hiện tại.')
            .required('Ngày nhập là bắt buộc.')
    });

    const handleSubmit = async (values) => {
        const isDuplicate = books.some(book => book.code === values.code);

        if (isDuplicate) {
            toast.error('Mã sách đã tồn tại. Vui lòng nhập mã sách khác.');
            return;
        }
        try {
            const response = await axios.post("http://localhost:3070/book", values);
            toast.success('Thêm mới thành công.');
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-5 w-50">
            <h2 className="text-center mb-4">Thêm Sách Mới</h2>
            <Formik
                initialValues={{
                    code: "",
                    name: "",
                    day: "",
                    quantity: "",
                    category: ""
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <FormikForm>
                        <Form.Group className="mb-3">
                            <Form.Label>Mã sách</Form.Label>
                            <Field
                                as={Form.Control}
                                type="text"
                                placeholder="Nhập mã sách"
                                name="code"
                            />
                            <ErrorMessage name="code" component="div" className="error-message text-danger"/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tên Sách</Form.Label>
                            <Field
                                as={Form.Control}
                                type="text"
                                placeholder="Nhập tên sách"
                                name="name"
                            />
                            <ErrorMessage name="name" component="div" className="error-message text-danger"/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ngày nhập</Form.Label>
                            <Field
                                as={Form.Control}
                                type="date"
                                name="day"
                            />
                            <ErrorMessage name="day" component="div" className="error-message text-danger"/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số Lượng</Form.Label>
                            <Field
                                as={Form.Control}
                                type="number"
                                placeholder="Nhập số lượng"
                                name="quantity"
                            />
                            <ErrorMessage name="quantity" component="div" className="error-message text-danger"/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Thể Loại</Form.Label>
                            <Field as="select" name="category" className="form-control">
                                <option value="">Chọn thể loại</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="category" component="div" className="error-message text-danger"/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Lưu
                        </Button>
                    </FormikForm>
                )}
            </Formik>
        </div>
    );
}

export default AddBook;
