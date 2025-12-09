import {
  AppstoreOutlined,
  CloseOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Popconfirm, Space, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import AvatarCell from "../common/AvatarCell";
import STTable from "../STTable/STTable";
import { useState } from "react";
import { useApiMutation } from "../../hooks/useApiMutation";
import { GET_MEMBER_BY_ID } from "../../api";

const MemberTable = ({
  users,
  onEdit,
  imageUrls,
  handleToggleStatus,
  membertype,
}) => {
  const [viewMode, setViewMode] = useState("table");

  const [selectedMember, setSelectedMember] = useState(null);
  const { trigger: fetchTrigger } = useApiMutation();

  const handleViewMember = async (id) => {
    try {
      const res = await fetchTrigger({
        url: `${GET_MEMBER_BY_ID}/${id}`,
      });
      if (!res?.data) return;
      setSelectedMember(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch member details.");
    }
  };
  const memberImageSrc = selectedMember?.user_image
    ? `${imageUrls.userImageBase}${selectedMember.user_image}`
    : imageUrls.noImage;
  const highlightMatch = (text, match) => {
    if (!match || !text) return text;
    const regex = new RegExp(`(${match})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === match.toLowerCase() ? (
        <mark
          key={index}
          style={{
            backgroundColor: "#3B82F6",
            color: "#ffffff",
            padding: "0 0.25rem",
            borderRadius: "0.25rem",
          }}
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const columns = [
    {
      title: "",
      key: "member_images",
      render: (_, user) => {
        const memberImageSrc = user.user_image
          ? `${imageUrls.userImageBase}${user.user_image}`
          : imageUrls.noImage;
        const spouseImageSrc = user.spouse_image
          ? `${imageUrls.userImageBase}${user.spouse_image}`
          : imageUrls.noImage;

        return (
          <div className="flex justify-center gap-2">
            <Avatar src={memberImageSrc} size={40} shape="square" />
            {user.user_member_type === "Couple Membership" && (
              <Avatar src={spouseImageSrc} size={40} shape="square" />
            )}
          </div>
        );
      },
    },
    {
      title: "MID",
      dataIndex: "user_mid",
      key: "user_mid",
      render: (_, user) => highlightMatch(user.user_mid, user._match),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, user) => highlightMatch(user.name, user._match),
    },

    {
      title: "DOB",
      dataIndex: "user_dob",
      key: "user_dob",
      render: (_, user) =>
        highlightMatch(dayjs(user.user_dob).format("DD-MM-YYYY"), user._match),
    },

    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      render: (_, user) => highlightMatch(user.mobile, user._match),
    },
    {
      title: "Spouse Name",
      dataIndex: "user_spouse_name",
      key: "user_spouse_name",
      render: (_, user) => highlightMatch(user.user_spouse_name, user._match),
    },
    ...(membertype === "superadmin"
      ? [
          {
            title: "Member Type",
            dataIndex: "user_member_type",
            key: "user_member_type",
            render: (_, user) =>
              highlightMatch(user.user_member_type, user._match),
          },
          {
            title: "Card Print",
            dataIndex: "user_card_print",
            key: "user_card_print",
            render: (_, user) =>
              highlightMatch(user.user_card_print, user._match),
          },
          {
            title: "Card Re Print",
            dataIndex: "user_card_re_print",
            key: "user_card_re_print",
            render: (_, user) =>
              highlightMatch(user.user_card_re_print, user._match),
          },
        ]
      : []),
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (_, user) => {
        const isActive = user.is_active === "active";

        return (
          <div className="flex justify-center">
            <Popconfirm
              title={`Mark member as ${isActive ? "Inactive" : "Active"}?`}
              onConfirm={() => handleToggleStatus(user)}
              okText="Yes"
              cancelText="No"
            >
              <Tag
                color={isActive ? "green" : "red"}
                icon={isActive ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                className="cursor-pointer"
              >
                {isActive ? "Active" : "Inactive"}
              </Tag>
            </Popconfirm>
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, user) => {
        return (
          <Space>
            <Tooltip title="Edit User">
              <Button
                type="primary"
                icon={<EditOutlined />}
                size="small"
                onClick={() => onEdit(user)}
              />
            </Tooltip>
            <Tooltip title="View">
              <Button
                size="small"
                icon={<AppstoreOutlined />}
                onClick={() => {
                  setViewMode("grid");
                  handleViewMember(user.id);
                }}
              />
            </Tooltip>
          </Space>
        );
      },
      width: 130,
    },
  ];

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <STTable data={users} columns={columns} />
        </div>

        <div className="col-span-4 space-y-4">
          {selectedMember ? (
            <Card
              size="small"
              title={
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">
                    {selectedMember.user_member_type} -{" "}
                    {selectedMember.user_mid}
                  </span>
                  <Button
                    type="text"
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={() => {
                      setSelectedMember(null);
                      setViewMode("table");
                    }}
                  />
                </div>
              }
              className="shadow-lg"
            >
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div
                  className={`flex ${
                    selectedMember.user_member_type === "Couple Membership"
                      ? "justify-center gap-6"
                      : "justify-center"
                  } pb-4 border-b border-gray-200`}
                >
                  <div className="flex flex-col items-center">
                    <AvatarCell imageSrc={memberImageSrc} size={120} />
                  </div>
                  {selectedMember.user_member_type === "Couple Membership" && (
                    <div className="flex flex-col items-center">
                      <AvatarCell
                        imageSrc={
                          selectedMember.spouse_image
                            ? `${imageUrls.userImageBase}${selectedMember.spouse_image}`
                            : imageUrls.noImage
                        }
                        size={120}
                      />
                    </div>
                  )}
                </div>

                {/* Member Details */}
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Name</span>
                    <span className="font-semibold text-gray-900">
                      {selectedMember.name || ""}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Mobile</span>
                    <span className="font-semibold text-gray-900">
                      {selectedMember.mobile}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">DOB:</span>
                    <span className="font-semibold text-gray-900">
                      {dayjs(selectedMember.user_dob).format("DD-MM-YYYY")}
                    </span>
                  </div>

                  {/* Spouse Details */}
                  {selectedMember.user_member_type === "Couple Membership" && (
                    <>
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="text-center mb-2.5">
                          <span className="text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                            Spouse Details
                          </span>
                        </div>
                      </div>
                      {selectedMember.user_spouse_name && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 font-medium">
                            Name
                          </span>
                          <span className="font-semibold text-gray-900">
                            {selectedMember.user_spouse_name}
                          </span>
                        </div>
                      )}
                      {selectedMember.user_spouse_mobile && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 font-medium">
                            Mobile
                          </span>
                          <span className="font-semibold text-gray-900">
                            {selectedMember.user_spouse_mobile}
                          </span>
                        </div>
                      )}
                      {selectedMember.user_spouse_dob && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 font-medium">DOB</span>
                          <span className="font-semibold text-gray-900">
                            {dayjs(selectedMember.user_spouse_dob).format(
                              "DD-MM-YYYY"
                            )}
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  {/* Contact Information */}
                  {(selectedMember.email || selectedMember.user_whatsapp) && (
                    <>
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="text-center mb-2.5">
                          <span className="text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                            Contact Info
                          </span>
                        </div>
                      </div>
                      {selectedMember.email && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 font-medium">
                            Email
                          </span>
                          <span className="font-semibold text-gray-900 text-xs break-all text-right max-w-[60%]">
                            {selectedMember.email}
                          </span>
                        </div>
                      )}
                      {selectedMember.user_whatsapp && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 font-medium">
                            WhatsApp
                          </span>
                          <span className="font-semibold text-gray-900">
                            {selectedMember.user_whatsapp}
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  {/* Additional Information */}
                  {(selectedMember.user_add || selectedMember.user_cat) && (
                    <>
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="text-center mb-2.5">
                          <span className="text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                            Other Details
                          </span>
                        </div>
                      </div>
                      {selectedMember.user_add && (
                        <div className="flex flex-col gap-1">
                          <span className="text-gray-500 font-medium">
                            Address
                          </span>
                          <span className="font-semibold text-gray-900 text-xs leading-relaxed">
                            {selectedMember.user_add}
                          </span>
                        </div>
                      )}
                      {selectedMember.user_cat && (
                        <div className="flex flex-col gap-1">
                          <span className="text-gray-500 font-medium">
                            Category
                          </span>
                          <span className="font-semibold text-gray-900 text-xs leading-relaxed">
                            {selectedMember.user_cat}
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  {/* Admin Details */}
                  <>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="text-center mb-2.5">
                        <span className="text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                          Admin Info
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-medium">
                        Card Print
                      </span>
                      <Tag
                        color={
                          selectedMember.user_card_print === "Yes"
                            ? "green"
                            : "default"
                        }
                        className="m-0 font-semibold"
                      >
                        {selectedMember.user_card_print || "No"}
                      </Tag>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-medium">
                        Card Re Print
                      </span>
                      <Tag
                        color={
                          selectedMember.user_card_re_print === "Yes"
                            ? "blue"
                            : "default"
                        }
                        className="m-0 font-semibold"
                      >
                        {selectedMember.user_card_re_print || "No"}
                      </Tag>
                    </div>
                    {selectedMember.user_remarks && (
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-500 font-medium">
                          Remarks
                        </span>
                        <span className="font-semibold text-gray-900 text-xs leading-relaxed">
                          {selectedMember.user_remarks}
                        </span>
                      </div>
                    )}
                  </>
                </div>
              </div>
            </Card>
          ) : (
            <div className="text-center text-gray-500 py-10">
              Select a member to view details
            </div>
          )}
        </div>
      </div>
    );
  }

  // Table view
  return <STTable data={users} columns={columns} />;
};

export default MemberTable;
