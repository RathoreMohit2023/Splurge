import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
  ScrollView  
} from "react-native";
import { X, ChevronDown, Calendar } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import addTransectionStyle from "../../styles/Components/Modals/addTransectionStyle";

const categoryOptions = [
  "Food & Dining", 
  "Shopping",
  "Transportation",
  "Entertainment",
  "Education",
  "Other",
];

const AddTransactionModal = ({ visible, onClose, onAdd }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const [focusField, setFocusField] = useState(null);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAdd = () => {
    if (!description || !amount || !category || !date) return;

    const newTransaction = {
      id: Date.now().toString(),
      description,
      amount: Number(amount),
      category,
      date,
    };

    onAdd(newTransaction);
    onClose();

    setDescription("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={addTransectionStyle.modalOverlay}>

        <View style={addTransectionStyle.modalContainer}>

          {/* Close Icon */}
          <TouchableOpacity style={addTransectionStyle.closeBtn} onPress={onClose}>
            <X size={28} color="#fff" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={addTransectionStyle.modalTitle}>Add Transaction</Text>

          {/* Description */}
          <View style={addTransectionStyle.inputBlock}>
            <Text style={addTransectionStyle.inputLabel}>Description</Text>
            <TextInput
              style={[
                addTransectionStyle.input,
                focusField === "description" && addTransectionStyle.inputFocused,
              ]}
              placeholder="Enter description"
              placeholderTextColor="#777"
              onFocus={() => setFocusField("description")}
              onBlur={() => setFocusField(null)}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Amount */}
          <View style={addTransectionStyle.inputBlock}>
            <Text style={addTransectionStyle.inputLabel}>Amount (₹)</Text>
            <TextInput
              style={[
                addTransectionStyle.input,
                focusField === "amount" && addTransectionStyle.inputFocused,
              ]}
              placeholder="Enter amount"
              placeholderTextColor="#777"
              keyboardType="numeric"
              onFocus={() => setFocusField("amount")}
              onBlur={() => setFocusField(null)}
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          {/* Category Dropdown */}
          <View style={addTransectionStyle.inputBlock}>
            <Text style={addTransectionStyle.inputLabel}>Category</Text>

            <TouchableOpacity
              style={[
                addTransectionStyle.input,
                addTransectionStyle.inputWithIcon,
                focusField === "category" && addTransectionStyle.inputFocused,
              ]}
              onPress={() => {
                setShowCategoryList(!showCategoryList);
                setFocusField("category");
              }}
            >
              <Text style={{ color: category ? "#fff" : "#777" }}>
                {category || "Select category"}
              </Text>

              <ChevronDown size={22} color="#7C3BEC" />
            </TouchableOpacity>

            {showCategoryList && (
                <View style={addTransectionStyle.dropdownWrapper}>
                    <ScrollView style={{ maxHeight: 130 }}> 
                        {categoryOptions.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={addTransectionStyle.dropdownItem}
                            onPress={() => {
                                setCategory(item);
                                setShowCategoryList(false);
                             }}
                        >
                            <Text style={addTransectionStyle.dropdownItemText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                    </ScrollView>
                </View>
            )}
          </View>

          {/* Date Picker Input */}
          <View style={addTransectionStyle.inputBlock}>
            <Text style={addTransectionStyle.inputLabel}>Date</Text>

            <TouchableOpacity
              style={[
                addTransectionStyle.input,
                addTransectionStyle.inputWithIcon,
                focusField === "date" && addTransectionStyle.inputFocused,
              ]}
              onPress={() => {
                setShowDatePicker(true);
                setFocusField("date");
              }}
            >
              <Text style={{ color: date ? "#fff" : "#777" }}>
                {date || "Select date"}
              </Text>

              <Calendar size={22} color="#7C3BEC" />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="calendar"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    const d = selectedDate.toISOString().split("T")[0];
                    setDate(d);
                  }
                  setFocusField(null);
                }}
              />
            )}
          </View>

          {/* Add Button */}
          <TouchableOpacity
            style={[
              addTransectionStyle.addBtn,
              !(description && amount && category && date) &&
                { opacity: 0.5 },
            ]}
            disabled={!(description && amount && category && date)}
            onPress={handleAdd}
          >
            <Text style={addTransectionStyle.addBtnText}>Add</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default AddTransactionModal;
