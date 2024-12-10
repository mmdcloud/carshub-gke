"use client";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import axiosInstance from "../../../network/axiosInstance";
import toast from "react-hot-toast";
import { buyerSchema } from "../../../utils/form-schemas";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import PageLoader from "@/components/common/Loader/pageLoader";

const BuyerForm = () => {
    const params = useSearchParams();
    const formik = useFormik({
        initialValues: {
            id: '',
            fullname: '',
            city: '',
            dob: '',
            gender: '',
            email: '',
            contact: ''
        },
        onSubmit: (values) => {
            if (params.get("id") !== null) {
                updateMutation.mutate(values);
            }
            else {
                mutation.mutate(values);
            }
        },
        validationSchema: buyerSchema
    });

    const mutation = useMutation({
        mutationFn: (payload) => {
            return axiosInstance.post('/buyers', payload);
        },
        onSuccess: (data, variables, context) => {
            formik.resetForm();
            toast.success("Created successfully !");
        },
        onError: (error, variables, context) => {
            toast.error("Something went wrong !");
        }
    })
    useEffect(() => {
        if (params.get("id") !== null) {
            formik.setFieldValue("id", params.get("id"));
            formik.setFieldValue("fullname", params.get("fullname"));
            formik.setFieldValue("contact", params.get("contact"));
            formik.setFieldValue("email", params.get("email"));
            formik.setFieldValue("gender", params.get("gender"));
            formik.setFieldValue("city", params.get("city"));
            formik.setFieldValue("dob", params.get("dob"));
        }
    }, []);
    const updateMutation = useMutation({
        mutationFn: (payload) => {
            return axiosInstance.patch('/buyers/' + params.get("id"), payload);
        },
        onSuccess: (data, variables, context) => {
            formik.resetForm();
            toast.success("Updated successfully !");
        },
        onError: (error, variables, context) => {
            toast.error("Something went wrong !");
        }
    })
    return (
        <DefaultLayout>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Buyer Form
                    </h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Full Name
                            </label>
                            <input
                                id="fullname"
                                name="fullname"
                                onChange={formik.handleChange}
                                value={formik.values.fullname}
                                type="text"
                                placeholder="Full Name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            {formik.errors.fullname && formik.touched.fullname ? (
                                <div className="text-red mt-2">{formik.errors.fullname}</div>
                            ) : null}
                        </div>

                        <div className="mb-5.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                City
                            </label>
                            <input
                                id="city"
                                name="city"
                                onChange={formik.handleChange}
                                value={formik.values.city}
                                type="text"
                                placeholder="City"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            {formik.errors.city && formik.touched.city ? (
                                <div className="text-red mt-2">{formik.errors.city}</div>
                            ) : null}
                        </div>
                        <div className="mb-5.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Contact
                            </label>
                            <input
                                id="contact"
                                name="contact"
                                maxLength={10}
                                onChange={formik.handleChange}
                                value={formik.values.contact}
                                type="text"
                                placeholder="Contact"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            {formik.errors.contact && formik.touched.contact ? (
                                <div className="text-red mt-2">{formik.errors.contact}</div>
                            ) : null}
                        </div>
                        <div className="mb-5.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                type="text"
                                placeholder="Email"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            {formik.errors.email && formik.touched.email ? (
                                <div className="text-red mt-2">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="mb-5.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Select Gender
                            </label>

                            <div className="relative z-20 bg-white dark:bg-form-input">
                                <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                                                fill="#637381"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                                                fill="#637381"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                                                fill="#637381"
                                            ></path>
                                        </g>
                                    </svg>
                                </span>

                                <select
                                    id="gender"
                                    name="gender"
                                    onChange={formik.handleChange}
                                    value={formik.values.gender}
                                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `}
                                >
                                    <option value="" disabled className="text-body dark:text-bodydark">
                                        Select Gender
                                    </option>
                                    <option value="Male" className="text-body dark:text-bodydark">
                                        Male
                                    </option>
                                    <option value="Female" className="text-body dark:text-bodydark">
                                        Female
                                    </option>
                                </select>
                                <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                fill="#637381"
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            {formik.errors.gender && formik.touched.gender ? (
                                <div className="text-red mt-2">{formik.errors.gender}</div>
                            ) : null}
                        </div>
                        <div className="mb-5.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Select date
                            </label>
                            <div className="relative">
                                <input
                                    id="dob"
                                    name="dob"
                                    onChange={formik.handleChange}
                                    value={formik.values.dob}
                                    type="date"
                                    className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    placeholder="yyyy/mm/dd"
                                    data-class="flatpickr-right"
                                />

                            </div>
                            {formik.errors.dob && formik.touched.dob ? (
                                <div className="text-red mt-2">{formik.errors.dob}</div>
                            ) : null}
                        </div>
                        {
                            mutation.isPending || updateMutation.isPending ? <PageLoader /> : <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Submit
                            </button>
                        }
                    </div>
                </form>
            </div>
        </DefaultLayout>
    )
};
export default BuyerForm;