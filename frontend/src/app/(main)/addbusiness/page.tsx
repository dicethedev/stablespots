"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BusinessStatus } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/app/hooks/useToast";
import SubmissionModal from "@/components/SubmissionModal";
import { BASE_URL } from "@/utils/config";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BusinessSchema } from "./types";

export default function AddBusiness() {
  const { showError } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [geo, setGeo] = useState<{ lat: string; lng: string }>({
    lat: "",
    lng: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGeo({
            lat: pos.coords.latitude.toString(),
            lng: pos.coords.longitude.toString(),
          });
        },
        (err) => console.error("Error fetching location:", err)
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#071134] to-[#0a1f4d] px-4 py-12 sm:px-6 md:px-8 lg:px-12">
      {submitted && (
        <SubmissionModal submitted={submitted} setSubmitted={setSubmitted} />
      )}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#071134] mb-8 text-center">
          🚀 Add Your Business
        </h1>

        <Formik
          enableReinitialize
          initialValues={{
            name: "",
            category: "",
            lat: geo.lat || "",
            lng: geo.lng || "",
            walletAddress: "",
            website: "",
            status: "pending" as BusinessStatus,
            acceptsUSDC: false,
            description: "",
            contactEmail: "",
          }}
          validationSchema={BusinessSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await axios.post(`${BASE_URL}/businesses`, {
                ...values,
                lat: parseFloat(values.lat),
                lng: parseFloat(values.lng),
              });
              setSubmitted(true);
              resetForm();
            } catch (error: any) {
              console.error("Error adding business:", error);
              showError("Failed to add business. Try again.", error?.toString());
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="space-y-6">
              {/* Name */}
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-semibold text-[#071134] mb-2">
                  Business Name *
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder="e.g. Crypto Café"
                  className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#071134] transition w-full"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label htmlFor="category" className="text-sm font-semibold text-[#071134] mb-2">
                  Category *
                </label>
                <Field
                  id="category"
                  name="category"
                  placeholder="e.g. Restaurant, Retail, Service"
                  className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#071134] transition w-full"
                />
                <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Lat & Lng */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="lat" className="text-sm font-semibold text-[#071134] mb-2">
                    Latitude *
                  </label>
                  <Field
                    id="lat"
                    name="lat"
                    placeholder="Enter latitude"
                    className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#071134] transition w-full"
                  />
                  <ErrorMessage name="lat" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="lng" className="text-sm font-semibold text-[#071134] mb-2">
                    Longitude *
                  </label>
                  <Field
                    id="lng"
                    name="lng"
                    placeholder="Enter longitude"
                    className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#071134] transition w-full"
                  />
                  <ErrorMessage name="lng" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* Wallet */}
              <div className="flex flex-col">
                <label htmlFor="walletAddress" className="text-sm font-semibold text-[#071134] mb-2">
                  Wallet Address *
                </label>
                <Field
                  id="walletAddress"
                  name="walletAddress"
                  placeholder="0x123...abc"
                  className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#071134] transition w-full"
                />
                <ErrorMessage name="walletAddress" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Accepts USDC */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptsUSDC"
                  checked={values.acceptsUSDC}
                  onCheckedChange={(checked: any) => setFieldValue("acceptsUSDC", Boolean(checked))}
                />
                <Label htmlFor="acceptsUSDC" className="text-sm font-semibold text-[#071134]">
                  Accepts USDC?
                </Label>
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label htmlFor="description" className="text-sm font-semibold text-[#071134] mb-2">
                  Description *
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="Short description about your business"
                  className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#071134] transition w-full resize-none"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Contact Email */}
              <div className="flex flex-col">
                <label htmlFor="contactEmail" className="text-sm font-semibold text-[#071134] mb-2">
                  Contact Email (optional)
                </label>
                <Field
                  id="contactEmail"
                  name="contactEmail"
                  placeholder="you@example.com"
                  className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#071134] transition w-full"
                />
                <ErrorMessage name="contactEmail" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Website */}
              <div className="flex flex-col">
                <label htmlFor="website" className="text-sm font-semibold text-[#071134] mb-2">
                  Website (optional)
                </label>
                <Field
                  id="website"
                  name="website"
                  placeholder="https://example.com"
                  className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#071134] transition w-full"
                />
                <ErrorMessage name="website" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer bg-[#071134] hover:bg-[#0a1a4b] text-white font-semibold py-4 rounded-xl shadow-md transform transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? "Adding..." : "Add Business"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
