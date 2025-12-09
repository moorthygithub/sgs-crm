import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Upload,
  Divider,
} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  TeamOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const MemberRegistrationForm = () => {
  const [form] = Form.useForm();
  const [userImagePreview, setUserImagePreview] = useState(null);
  const [spouseImagePreview, setSpouseImagePreview] = useState(null);

  const membershipTypes = [
    { value: "single", label: "Single Membership" },
    { value: "couple", label: "Couple Membership" },
    { value: "family", label: "Family Membership" },
    { value: "life", label: "Life Membership" },
  ];

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const AvatarCell = ({ imageSrc }) => (
    <div className="!w-16 !h-16 !rounded-full !overflow-hidden !border-2 !border-gray-300 !bg-gray-100 !flex !items-center !justify-center">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Avatar"
          className="!w-full !h-full !object-cover"
        />
      ) : (
        <UserOutlined className="!text-2xl !text-gray-400" />
      )}
    </div>
  );

  return (
    <div className="!min-h-screen !bg-gradient-to-br !from-blue-50 !to-indigo-100 !p-8 !flex !items-center !justify-center">
      <div className="!w-full !max-w-6xl">
        <Card
          title={
            <div className="!text-center !py-2">
              <h2 className="!text-2xl !font-bold !text-gray-800 !m-0">
                New Member Registration
              </h2>
              <p className="!text-sm !text-gray-500 !mt-1 !m-0">
                Please fill in all required information
              </p>
            </div>
          }
          className="!shadow-2xl !rounded-2xl"
          bordered={false}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="!mt-4"
            requiredMark={false}
          >
            {/* Personal Information Section */}
            <div className="!mb-6">
              <Divider orientation="left" className="!border-gray-300">
                <span className="!text-base !font-semibold !text-gray-700 !flex !items-center !gap-2">
                  <UserOutlined /> Personal Information
                </span>
              </Divider>
              <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-4">
                <Form.Item
                  label={
                    <span className="!font-medium !text-gray-700">
                      Full Name
                    </span>
                  }
                  name="user_full_name"
                  rules={[
                    { required: true, message: "Please enter full name" },
                  ]}
                >
                  <Input
                    maxLength={20}
                    placeholder="Enter full name"
                    className="!rounded-lg"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span className="!font-medium !text-gray-700">
                      Date of Birth
                    </span>
                  }
                  rules={[{ required: true, message: "Select DOB" }]}
                  name="user_dob"
                >
                  <DatePicker
                    className="!w-full !rounded-lg"
                    format="DD-MM-YYYY"
                    placeholder="Select date"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span className="!font-medium !text-gray-700">
                      Mobile Number
                    </span>
                  }
                  name="user_mobile"
                  rules={[
                    { required: true, message: "Please enter mobile number" },
                    {
                      pattern: /^\d{10}$/,
                      message: "Must be exactly 10 digits",
                    },
                  ]}
                >
                  <Input
                    maxLength={10}
                    inputMode="numeric"
                    placeholder="10 digit mobile number"
                    className="!rounded-lg"
                    size="large"
                    prefix={<PhoneOutlined className="!text-gray-400" />}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) e.preventDefault();
                    }}
                  />
                </Form.Item>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="!mb-6">
              <Divider orientation="left" className="!border-gray-300">
                <span className="!text-base !font-semibold !text-gray-700 !flex !items-center !gap-2">
                  <PhoneOutlined /> Contact Information
                </span>
              </Divider>
              <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-4">
                <Form.Item
                  label={
                    <span className="!font-medium !text-gray-700">
                      WhatsApp Number
                    </span>
                  }
                  name="user_whatsapp"
                  rules={[
                    {
                      pattern: /^\d{10}$/,
                      message: "Must be exactly 10 digits",
                    },
                  ]}
                >
                  <Input
                    maxLength={10}
                    inputMode="numeric"
                    placeholder="WhatsApp number"
                    className="!rounded-lg"
                    size="large"
                    prefix={<PhoneOutlined className="!text-gray-400" />}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) e.preventDefault();
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span className="!font-medium !text-gray-700">
                      Email Address
                    </span>
                  }
                  name="user_email"
                  rules={[
                    { required: true, message: "Email is required" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    maxLength={50}
                    placeholder="email@example.com"
                    className="!rounded-lg"
                    size="large"
                    prefix={<MailOutlined className="!text-gray-400" />}
                  />
                </Form.Item>
              </div>
            </div>

            {/* Spouse Information Section */}
            <div className="!mb-6">
              <Divider orientation="left" className="!border-gray-300">
                <span className="!text-base !font-semibold !text-gray-700 !flex !items-center !gap-2">
                  <TeamOutlined /> Spouse Information (Optional)
                </span>
              </Divider>
              <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-4">
                <Form.Item
                  label={
                    <span className="!font-medium !text-gray-700">
                      Spouse Name
                    </span>
                  }
                  name="user_spouse_name"
                >
                  <Input
                    maxLength={50}
                    placeholder="Enter spouse name"
                    className="!rounded-lg"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span className="!font-medium !text-gray-700">
                      Spouse Mobile
                    </span>
                  }
                  name="user_spouse_mobile"
                  rules={[
                    {
                      pattern: /^\d{10}$/,
                      message: "Must be exactly 10 digits",
                    },
                  ]}
                >
                  <Input
                    maxLength={10}
                    inputMode="numeric"
                    placeholder="10 digit mobile number"
                    className="!rounded-lg"
                    size="large"
                    prefix={<PhoneOutlined className="!text-gray-400" />}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) e.preventDefault();
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span className="!font-medium !text-gray-700">
                      Spouse DOB
                    </span>
                  }
                  name="user_spouse_dob"
                >
                  <DatePicker
                    className="!w-full !rounded-lg"
                    format="DD-MM-YYYY"
                    placeholder="Select date"
                    size="large"
                  />
                </Form.Item>
              </div>
            </div>

            {/* Membership Details Section */}
            <div className="!mb-6">
              <Divider orientation="left" className="!border-gray-300">
                <span className="!text-base !font-semibold !text-gray-700 !flex !items-center !gap-2">
                  <UserOutlined /> Membership Details
                </span>
              </Divider>
              <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-4">
                <Form.Item
                  label={
                    <span className="!font-medium !text-gray-700">
                      Membership Type
                    </span>
                  }
                  name="user_type"
                  rules={[
                    {
                      required: true,
                      message: "Please select membership type",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select membership type"
                    className="!rounded-lg"
                    size="large"
                  >
                    {membershipTypes.map((type) => (
                      <Option key={type.value} value={type.value}>
                        {type.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label={
                    <span className="!font-medium !text-gray-700">
                      User Category
                    </span>
                  }
                  rules={[{ required: true, message: "Category is required" }]}
                  name="user_cat"
                >
                  <Input
                    placeholder="Enter category"
                    className="!rounded-lg"
                    size="large"
                  />
                </Form.Item>
              </div>
            </div>

            {/* Images Section */}
            <div className="!mb-6">
              <Divider orientation="left" className="!border-gray-300">
                <span className="!text-base !font-semibold !text-gray-700 !flex !items-center !gap-2">
                  <UploadOutlined /> Profile Images
                </span>
              </Divider>
              <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-6">
                <Form.Item
                  name="user_image"
                  label={
                    <span className="!font-medium !text-gray-700">
                      Member Image
                    </span>
                  }
                >
                  <div className="!flex !items-center !gap-4 !p-4 !border-2 !border-dashed !border-gray-300 !rounded-xl !bg-gray-50 hover:!border-blue-400 !transition-colors">
                    <AvatarCell imageSrc={userImagePreview} />
                    <div className="!flex-1">
                      <Upload
                        showUploadList={false}
                        accept="image/*"
                        beforeUpload={(file) => {
                          const reader = new FileReader();
                          reader.onload = (e) =>
                            setUserImagePreview(e.target.result);
                          reader.readAsDataURL(file);
                          return false;
                        }}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          className="!w-full !rounded-lg"
                          size="large"
                        >
                          Upload Member Image
                        </Button>
                      </Upload>
                      <p className="!text-xs !text-gray-500 !mt-2 !m-0">
                        Maximum size: 5MB
                      </p>
                    </div>
                  </div>
                </Form.Item>
                <Form.Item
                  name="spouse_image"
                  label={
                    <span className="!font-medium !text-gray-700">
                      Spouse Image
                    </span>
                  }
                >
                  <div className="!flex !items-center !gap-4 !p-4 !border-2 !border-dashed !border-gray-300 !rounded-xl !bg-gray-50 hover:!border-blue-400 !transition-colors">
                    <AvatarCell imageSrc={spouseImagePreview} />
                    <div className="!flex-1">
                      <Upload
                        showUploadList={false}
                        accept="image/*"
                        beforeUpload={(file) => {
                          const reader = new FileReader();
                          reader.onload = (e) =>
                            setSpouseImagePreview(e.target.result);
                          reader.readAsDataURL(file);
                          return false;
                        }}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          className="!w-full !rounded-lg"
                          size="large"
                        >
                          Upload Spouse Image
                        </Button>
                      </Upload>
                      <p className="!text-xs !text-gray-500 !mt-2 !m-0">
                        Maximum size: 5MB
                      </p>
                    </div>
                  </div>
                </Form.Item>
              </div>
            </div>

            {/* Address Section */}
            <div className="!mb-6">
              <Divider orientation="left" className="!border-gray-300">
                <span className="!text-base !font-semibold !text-gray-700 !flex !items-center !gap-2">
                  <HomeOutlined /> Address Information
                </span>
              </Divider>
              <Form.Item
                label={
                  <span className="!font-medium !text-gray-700">
                    Complete Address
                  </span>
                }
                name="user_add"
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter complete address with pincode"
                  className="!rounded-lg"
                />
              </Form.Item>
            </div>

            {/* Submit Button */}
            <Form.Item className="!text-center !mt-8 !mb-0">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="!px-12 !h-12 !rounded-lg !font-semibold !text-base"
              >
                Register Member
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default MemberRegistrationForm;
