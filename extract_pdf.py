
import sys

def try_pypdf2(path):
    try:
        import PyPDF2
        print("Using PyPDF2...")
        with open(path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            return text
    except ImportError:
        return None
    except Exception as e:
        return f"PyPDF2 error: {e}"

def try_pdfminer(path):
    try:
        from pdfminer.high_level import extract_text
        print("Using pdfminer...")
        return extract_text(path)
    except ImportError:
        return None
    except Exception as e:
        return f"pdfminer error: {e}"

path = "V2 - Strategic Calibration Review_ AI Safety, Governance, Ethics Chapter - Sri Lanka.pdf"

text = try_pypdf2(path)
if text is None:
    text = try_pdfminer(path)

if text:
    print("--- START CONTENT ---")
    print(text[:20000]) # Print first 20k chars
    print("--- END CONTENT ---")
else:
    print("Could not extract text. Libraries not found.")
