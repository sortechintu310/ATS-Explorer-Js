import { JSONTree } from "react-json-tree"

export default function TreeBox({ json }) {
    return (
        <div>
            <JSONTree data={json} />
        </div>
    )
}