import CodeMirror from "@uiw/react-codemirror";

export default function JSONBox({ json }) {
    return (
        <div>
            <CodeMirror
                value={json}
            />
        </div>
    )
}