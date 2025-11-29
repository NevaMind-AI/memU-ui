# memU-ui
<div align="center">

# memU-ui: Visual Front-End Interface for the AI Memory System
[![License: AGPL 3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://opensource.org/license/agpl-v3)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Discord](https://img.shields.io/badge/Discord-Join%20Chat-5865F2?logo=discord&logoColor=white)](https://discord.gg/memu)
[![Twitter](https://img.shields.io/badge/Twitter-Follow-1DA1F2?logo=x&logoColor=white)](https://x.com/memU_ai)

</div>

**memU-ui** is the web frontend for **MemU**, designed to provide developers with an intuitive and visual interface. Through a graphical dashboard, users can easily browse, query, and manage the memory data of Agents. It seamlessly connects with the memU-server API for real-time data display and operations. memU-ui can be deployed locally or in private environments, and supports one-click startup via Docker.

Core Algorithm 👉 memU: https://github.com/NevaMind-AI/memU  
Full backend for local deployment 👉 memU-server: https://github.com/NevaMind-AI/memU-server  
One call = response + memory 👉 memU Response API: https://memu.pro/docs#responseapi  
Try memU instantly 👉 https://app.memu.so/quick-start

---

## ⭐ Star Us on GitHub
Star **memU-ui** to get notified about new releases and join our growing community of AI developers building intelligent agents with persistent memory.

💬 **Join our Discord community**: https://discord.gg/memu

---

## 🚀 Get Started

## 🔑 Key Features

### **Quick Deployment**
- Docker image provided  
- Launch the frontend with a single command  
- Fully compatible with memU-server API  
- Always in sync with memU feature updates  

### **Visual Memory Management**  
*(Some features planned for future releases)*

#### **Browse and Operate Memory**
- View memory submission records  
- Query and track retrieval records  
- Visualize LLM token usage  

#### **User and Permission Management**
- Login and registration for multi-user environments  
- Role-based access control (Developer / Admin / Regular User)  
- Configure access scope and permissions from the frontend  

---

## 🧩 Why MemU?

Most memory systems in current LLM pipelines rely heavily on explicit modeling, requiring manual definition and annotation of memory categories. This limits AI’s ability to truly understand memory and makes it difficult to support diverse usage scenarios.

MemU offers a flexible and robust alternative, inspired by hierarchical storage architecture in computer systems. It progressively transforms heterogeneous input data into queryable and interpretable textual memory.

Its core architecture consists of three layers: **Resource Layer → Memory Item Layer → MemoryCategory Layer**.

<img width="1363" height="563" alt="Three-Layer Architecture Diagram" src="https://github.com/user-attachments/assets/937bacfd-b74e-4a6f-a56a-2a2153a9b68c" />

- Resource Layer: Multimodal raw data warehouse
- Memory Item Layer: Discrete extracted memory units
- MemoryCategory Layer: Aggregated textual memory units

### Key Features:
- Full Traceability: Track from raw data → items → documents and back
- Memory Lifecycle: Memorization → Retrieval → Self-evolution
- Two Retrieval Methods:
  - RAG-based: Fast embedding vector search
  - LLM-based: Direct file reading with deep semantic understanding
- Self-Evolving: Adapts memory structure based on usage patterns
  
<img width="1365" height="308" alt="process" src="https://github.com/user-attachments/assets/6188adc9-b6b5-4ff2-ac51-f68da269ad34" />

---

## 📄 License

By contributing to memU-server, you agree that your contributions will be licensed under the **AGPL-3.0 License**.

---

## 🌍 Community

For more information please contact info@nevamind.ai

- GitHub Issues: Report bugs, request features, and track development. [Submit an issue](https://github.com/NevaMind-AI/memU-ui/issues)
- Discord: Get real-time support, chat with the community, and stay updated. [Join us](https://discord.com/invite/hQZntfGsbJ)
- X (Twitter): Follow for updates, AI insights, and key announcements. [Follow us](https://x.com/memU_ai)

