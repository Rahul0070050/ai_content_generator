import { Editor } from "@toast-ui/react-editor";

import "@toast-ui/editor/dist/toastui-editor.css";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useEffect, useRef } from "react";

interface PROPS {
  result: string;
}
function OutPut({ result }: PROPS) {
  const editorRef: any = useRef(null);
  useEffect(() => {
    console.log(editorRef.current);

    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(result);
    // console.log("result ", result);
  }, [result]);
  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <Button className="flex gap-2 text-white font-bold">
          <Copy className="w-4 h-4" /> Copy
        </Button>
      </div>
      <Editor
        initialValue="Your result will appear here"
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        ref={editorRef}
        // onChange={() =>
        //   console.log(editorRef.current.getInstance().getMarkdown())
        // }
      />
    </div>
  );
}

export default OutPut;
