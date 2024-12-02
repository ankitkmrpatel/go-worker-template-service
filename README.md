# Worker Service Project

---

## **Project Overview**

This project is a file management application with the following key functionalities:

1. **Worker Management**: Create and list workers.
2. **Thread Management**: Create, list, and delete threads.
3. **File Uploading**: Upload files to threads with drag-and-drop support.
4. **File Processing**: Process files (XML/Excel) with real-time updates via SSE.
5. **File Content Rendering**: Render XML content and Excel sheet data interactively.

The application is built with **Next.js** (using the App Router) for the frontend and **Go APIs** for backend functionality. All API calls are centralized using the `goapi.ts` file.

---

## **Testing**

### **1. General Guidelines**

- Use a development environment with all required services (Next.js server and Go API) running.
- Verify each page's functionality independently and perform end-to-end testing.

### **2. Pages Testing**

#### **Page 1: Worker Management**

- Test creating a worker via the UI and verify data persistence in the backend.
- Check the worker listing page for correct data rendering.
- Ensure redirection to the Thread Management page upon selecting a worker.

#### **Page 2: Thread Management**

- Test creating threads under a worker and verify the backend stores them correctly.
- Verify threads are listed correctly in the UI.
- Test deleting a thread and confirm its removal from the backend.

#### **Page 3: File Uploading**

- Test uploading files to a specific thread using the drag-and-drop interface.
- Verify the uploaded file appears in the thread’s file list.
- Check for proper error handling during upload failures.

#### **Page 4: File Processing**

- Test XML and Excel file processing with various file sizes and formats.
- Ensure real-time updates via SSE during processing.
- Validate the completion message with the correct file data summary:
  - **XML**: Display the first 50KB of content.
  - **Excel**: Show worksheet names and first worksheet table data.

#### **Page 5: File Content Rendering**

- Test XML rendering for properly formatted and syntax-highlighted content.
- Verify Excel rendering with `SheetJS` or `react-data-grid` for interactive tables.
- Handle unsupported file types gracefully.

---

### **3. Error Scenarios**

- Test scenarios where backend APIs fail or return errors.
- Verify that error messages and fallback mechanisms work as expected in the UI.
- Test network interruptions during file uploads and processing.

---

## **Next Steps**

### **1. Optimizations**

- Optimize the UI for responsiveness across devices.
- Cache API responses where applicable to reduce redundant network calls.
- Optimize Excel rendering for large datasets.

### **2. Documentation**

- Provide user documentation for deploying and using the application.
- Document API contracts for frontend-backend communication.

### **3. Enhancements**

- Add pagination for workers, threads, and files for scalability.
- Implement user authentication and authorization for secured access.
- Add download functionality for processed files.

### **4. Deployment**

- Deploy the application using a cloud service provider (e.g., AWS, GCP).
- Set up CI/CD pipelines for seamless development and deployment.

---

## **Testing Checklist**

### **Unit Tests**

- [ ] Test all centralized methods in `goapi.ts`.
- [ ] Verify API routes in `app/api`.

### **Integration Tests**

- [ ] Test end-to-end workflows for worker-thread-file management.
- [ ] Validate SSE updates for real-time file processing.

### **Performance Tests**

- [ ] Test file upload and processing for large files.
- [ ] Ensure rendering remains performant with large datasets.

---

This README outlines the testing procedure and next steps. Let me know if additional details are required!
