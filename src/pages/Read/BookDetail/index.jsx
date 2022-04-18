// import { Document, Page } from 'react-pdf';
import {GridContent} from "@ant-design/pro-layout";
import {useState} from "react";
// import { pdfjs } from 'react-pdf';
import {Row} from "antd";
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
const BookDetail = () => {
  const [totalPages, setTotalPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setTotalPages(numPages);
  }

  return(
    <GridContent>
      <Row>
        <iframe
          width={'100%'}
          height={700}
          src={"https://office-cn-hangzhou.imm.aliyuncs.com/office/f/16177ae32a1b20df467f0556414fa2849993ffef"}
          // src={"https://office-cn-hangzhou.imm.aliyuncs.com/office/f/16177ae32a1b20df467f0556414fa2849993ffef"}
          frameborder={0}
        />
      </Row>
    </GridContent>
  );

}

export default BookDetail;
