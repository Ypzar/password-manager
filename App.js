import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Clipboard from "@react-native-clipboard/clipboard";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwords, setPasswords] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savePasswords = await AsyncStorage.getItem("passwords");
        if (savePasswords !== null) {
          setPasswords(JSON.parse(savePasswords));
        }
      } catch (error) {
        console.error("Error loading passwords:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    showPasswords();
  }, []);

  const maskPassword = (pass) => {
    let str = "";
    for (let index = 0; index < pass.length; index++) {
      str += "*";
    }
    return str;
  };

  const copyText = async (txt) => {
    try {
      await Clipboard.setString(txt);
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
    } catch (error) {
      console.error("Error copying text:", error);
    }
  };

  const deletePasswords = async (website) => {
    const updatedPasswords = passwords.filter((e) => e.website !== website);
    setPasswords(updatedPasswords);
    await AsyncStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    alert(`Successfully deleted ${website}'s password`);
  };

  const showPasswords = () => {
    setPasswords([]);
    setWebsite("");
    setUsername("");
    setPassword("");
    setEditing(false);
    setEditIndex(null);
  };
  const savePassword = async () => {
    // Check if any of the input fields is empty
    if (!website || !username || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (editing && editIndex !== null) {
      const updatedPasswords = [...passwords];
      updatedPasswords[editIndex] = {
        website,
        username,
        password,
      };
      await AsyncStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      setPasswords(updatedPasswords);
      setEditing(false);
      setEditIndex(null);
    } else {
      const newPassword = {
        website,
        username,
        password,
      };
      const updatedPasswords = [...passwords, newPassword];
      await AsyncStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      setPasswords([...passwords, newPassword]);
    }
    setWebsite("");
    setUsername("");
    setPassword("");
  };

  const editPassword = (index) => {
    setEditing(true);
    setEditIndex(index);
    setWebsite(passwords[index].website);
    setUsername(passwords[index].username);
    setPassword(passwords[index].password);
  };

  const renderPasswordList = () => {
    return passwords.map((item, index) => (
      <View style={styles.passwordItem} key={index}>
        <View>
          <View style={styles.listItem}>
            <Text style={styles.listLabel}>Website: </Text>
            <Text style={styles.listValue}>{item.website}</Text>
            <TouchableOpacity
              style={styles.copyIcon}
              onPress={() => {
                copyText(item.website);
              }}
            >
              <Octicons name="copy" size={20} color="#ccc" />
            </TouchableOpacity>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.listLabel}>Username: </Text>
            <Text style={styles.listValue}>{item.username}</Text>
            <TouchableOpacity
              style={styles.copyIcon}
              onPress={() => {
                copyText(item.username);
              }}
            >
              <Octicons name="copy" size={20} color="#ccc" />
            </TouchableOpacity>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.listLabel}>Password: </Text>
            <Text style={styles.listValue}>{maskPassword(item.password)}</Text>
            <TouchableOpacity
              style={styles.copyIcon}
              onPress={() => {
                copyText(item.password);
              }}
            >
              <Octicons name="copy" size={20} color="#ccc" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => editPassword(index)}
          >
            <FontAwesome name="edit" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deletePasswords(item.website)}
          >
            <AntDesign name="delete" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  return (
    <LinearGradient
      colors={["#667EEA", "#764BA2"]}
      style={styles.gradientContainer}
    >
      <ScrollView style={styles.container}>
        <StatusBar style="light" backgroundColor="#000" />
        <View style={styles.content}>
          <Text style={styles.heading}>Password Manager</Text>
          <MaterialCommunityIcons
            name="account-key"
            size={34}
            color="#eee"
            style={styles.titleIcon}
          />
          <Text style={styles.description}>
            A Password Manager is an app that allows users to store and manage
            their passwords.
          </Text>
          <Text style={styles.subHeading}>
            Your Passwords {alertVisible && <Text id="alert">(Copied!)</Text>}
          </Text>
          {passwords.length === 0 ? (
            <Text style={styles.noData}>No Data Show</Text>
          ) : (
            <ScrollView horizontal>
              <View style={styles.table}>{renderPasswordList()}</View>
            </ScrollView>
          )}

          <Text style={styles.subHeading}>
            {editing ? "Edit Password" : "Add a Password"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Website"
            value={website}
            onChangeText={(text) => {
              setWebsite(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />

          <TouchableOpacity style={styles.submitButton} onPress={savePassword}>
            <Text style={styles.submitButtonText}>
              {editing ? "Update Password" : "Add Password"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
