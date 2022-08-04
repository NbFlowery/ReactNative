import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./colors";

const STORAGE_KEY = "@toDos";

export default function App() {
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const [check, setCheck] = useState(false);

  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.log(e);
    }
  };

  const loadToDos = async () => {
    try {
      const str = await AsyncStorage.getItem(STORAGE_KEY);
      if (str !== null) {
        setToDos(JSON.parse(str));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    // save to do
    const newToDos = Object.assign({}, toDos, {
      [Date.now()]: { text, check },
    });
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  const deleteToDo = (key) => {
    Alert.alert("Delete To Do", "정말로 삭제하시겠습니까?", [
      { text: "취소" },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          await saveToDos(newToDos);
        },
      },
    ]);
    return;
  };

  const modifyTodo = async (key) => {
    Alert.prompt(
      "수정",
      "내용을 입력하세요.",
      [
        { text: "취소" },
        {
          text: "수정",
          style: "destructive",
          onPress: async (text) => {
            const newToDos = { ...toDos };
            newToDos[key].text = text;
            setToDos(newToDos);
            await saveToDos(newToDos);
          },
        },
      ],
      "plain-text",
      toDos[key].text
    );

    return;
  };
  
  const checkTodo = async (key) => {
    const newToDos = { ...toDos };
    {
      newToDos[key].check
        ? (newToDos[key].check = false)
        : (newToDos[key].check = true);
    }
    setToDos(newToDos);
    await saveToDos(newToDos);
  };

  useEffect(() => {
    loadToDos();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.calendar}>
        <Text style={styles.calendarText}>2022년 7월</Text>
      </View>
      <View style={styles.header}>
        <Text style={{ ...styles.btnText, color: "black" }}>TODO</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "green" }}>
            100%
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "500", marginLeft: 5 }}>
            완료
          </Text>
        </View>
      </View>
      <TextInput
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        returnKeyType="done"
        value={text}
        placeholder="Add a To Do"
        style={styles.input}
      />
      <ScrollView>
        {Object.keys(toDos).map((key) => (
          <View style={styles.toDo} key={key}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {toDos[key].check === true ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity onPress={() => checkTodo(key)}>
                    <MaterialIcons
                      name="check-circle"
                      size={30}
                      color="black"
                    />
                  </TouchableOpacity>
                  <Text style={styles.checkToDoText}>{toDos[key].text}</Text>
                </View>
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity onPress={() => checkTodo(key)}>
                    <MaterialIcons
                      name="radio-button-unchecked"
                      size={30}
                      color="black"
                    />
                  </TouchableOpacity>

                  <Text style={styles.toDoText}>{toDos[key].text}</Text>
                </View>
              )}
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => modifyTodo(key)}>
                <FontAwesome name="pencil" size={20} style={{ marginRight: 10, color: theme.trash }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Fontisto name="trash" size={20} color={theme.trash} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 50,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  btnText: {
    fontSize: 36,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#F7F7F7",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },

  toDo: {
    marginBottom: 10,
    paddingVertical: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  toDoText: {
    color: "black",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
  },

  calendar: {
    marginTop: 100,
  },

  calendarText: {
    color: "black",
    fontSize: 38,
    fontWeight: "700",
  },

  checkToDoText: {
    color: theme.lightGray,
    textDecorationLine: "line-through",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
  },
});
