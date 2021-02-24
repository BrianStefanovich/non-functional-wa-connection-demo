export function CreateVariant(variant) {
  return {
    type: "CREATE_TEXT",
    data: variant,
  };
}

export function DeleteAll() {
  return {
    type: "DELETE_ALL_TEXT",
  };
}

export function EditVariant(index, editorData) {
  return {
    type: "EDIT_TEXT",
    data: {
      index: index,
      body: editorData.body,
      textState: editorData.textState,
    },
  };
}

export function DeleteVariant(id) {
  return {
    type: "DELETE_TEXT",
    data: id,
  };
}

export function SetActiveVariant(id) {
  return {
    type: "SET_TEXT_ACTIVE",
    data: id,
  };
}
