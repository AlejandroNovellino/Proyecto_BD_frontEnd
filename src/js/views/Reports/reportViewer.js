import React, { useRef, useEffect } from "react";
import "../../../styles/index.css";

import WebViewer from "@pdftron/pdfjs-express";

export const ReportViewer = docUrl => {
	const viewer = useRef(null);

	useEffect(() => {
		WebViewer(
			{
				path: "/webviewer",
				initialDoc: docUrl,
			},
			viewer.current
		).then(instance => {
			instance.UI.loadDocument(docUrl, {
				filename: "myfile.pdf",
			});

			const { documentViewer } = instance.Core;
			documentViewer.addEventListener("documentLoaded", () => {
				// perform document operations
			});
		});
	}, []);

	return (
		<div className="ReportViewer">
			<div className="header">React sample</div>
			<div className="webviewer" ref={viewer}></div>
		</div>
	);
};
