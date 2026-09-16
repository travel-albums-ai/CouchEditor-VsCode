import * as vscode from 'vscode';

const youtubeEmbedUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

export function activate(context: vscode.ExtensionContext): void {
	const disposable = vscode.commands.registerCommand('couch-editor.open', () => {
		const panel = vscode.window.createWebviewPanel(
			'couchEditor',
			'Couch Editor',
			vscode.ViewColumn.One,
			{
				enableScripts: false,
				retainContextWhenHidden: true,
			}
		);

		panel.webview.html = getWebviewContent();
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent(): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src https://www.youtube.com; style-src 'unsafe-inline';">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style>
		html, body {
			height: 100%;
			margin: 0;
		}

		body {
			background: #1e1e1e;
			display: grid;
			place-items: center;
		}

		iframe {
			border: 0;
			height: min(56.25vw, 80vh);
			max-width: 100%;
			width: min(100%, calc(80vh * 16 / 9));
		}
	</style>
</head>
<body>
	<iframe
		title="YouTube video"
		src="${youtubeEmbedUrl}"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen>
	</iframe>
</body>
</html>`;
}

export function deactivate(): void {}
