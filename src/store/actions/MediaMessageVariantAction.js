export function CreateVariant(variant) {
  return {
    type: "CREATE_MEDIA_TEXT",
    data: variant,
  };
}

export function DeleteAll() {
  return {
    type: "DELETE_ALL_MEDIA_TEXT",
  };
}

export function EditVariant(index, editorData) {
  return {
    type: "EDIT_MEDIA_TEXT",
    data: {
      index: index,
      body: editorData.body,
      textState: editorData.textState,
    },
  };
}

export function DeleteVariant(id) {
  return {
	  type: "DELETE_MEDIA_TEXT",
    data: id,
  };
}

export function SetMediaPath(path) {
  return {
    type: "SET_MEDIA_PATH",
    data: path,
  };
}

export function SetMediaType(path) {
  return {
    type: "SET_MEDIA_TYPE",
    data: path,
  };
}

export function SetActiveVariant(id) {
  return {
	  type: "SET_MEDIA_TEXT_ACTIVE",
    data: id,
  };
}
