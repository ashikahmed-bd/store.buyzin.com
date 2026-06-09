<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";

const props = defineProps({
    label: {
        type: String,
        default: "",
    },
    modelValue: {
        type: String,
        default: "",
    },
    required: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: "Write something...",
    },
    readOnly: {
        type: Boolean,
        default: false,
    },
    error: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["update:modelValue"]);

const editor = ref(null);
let vditor = null;

onMounted(() => {
    vditor = new Vditor(editor.value, {
        height: 450,

        lang: "en_US",

        theme: "classic",
        mode: "wysiwyg",

        placeholder: props.placeholder,
        readonly: props.readOnly,

        cache: {
            enable: false,
        },

        counter: {
            enable: true,
            type: "markdown",
        },

        preview: {
            hljs: {
                style: "github",
                lineNumber: true,
            },
            markdown: {
                toc: true,
            },
        },

        toolbar: [
            "emoji",
            "headings",
            "bold",
            "italic",
            "strike",
            "link",
            "|",
            "list",
            "ordered-list",
            "check",
            "outdent",
            "indent",
            "|",
            "quote",
            "line",
            "code",
            "inline-code",
            "insert-before",
            "insert-after",
            "|",
            "upload",
            "record",
            "table",
            "|",
            "undo",
            "redo",
            "edit-mode",
            "both",
            "preview",
            "fullscreen",
        ],

        after() {
            vditor.setValue(props.modelValue || "");
        },

        input(value) {
            emit("update:modelValue", value);
        },
    });
});

watch(
    () => props.modelValue,
    (value) => {
        if (vditor && value !== vditor.getValue()) {
            vditor.setValue(value || "");
        }
    }
);

onBeforeUnmount(() => {
    if (vditor) {
        vditor.destroy();
        vditor = null;
    }
});
</script>

<template>
    <div class="mb-4">
        <label v-if="label" class="mb-2 block text-sm font-medium text-slate-700">
            {{ label }}
            <span v-if="required" class="text-red-500">
                *
            </span>
        </label>

        <div ref="editor" class="overflow-hidden" />

        <p v-if="error" class="mt-1 text-sm text-red-500">
            {{ error }}
        </p>
    </div>
</template>

<style scoped>
:deep(.vditor-toolbar) {
    padding-left: 10px !important;
}

:deep(.vditor-reset) {
    padding: 10px 9px !important;
}
</style>