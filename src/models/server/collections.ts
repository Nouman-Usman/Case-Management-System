import { IndexType, Permission } from "node-appwrite";
import {
    db,
    lawyerProfile,
    chamberProfile,
    clientProfile,
    cases,
    chamberMembers,
    documents,
    lawyerExpertise,
    notifications,
    payments,
    subscriptions,
    chats_table,
    sessions_table,
} from "../name";
import { databases } from "./config";
// import { database } from "@/appwrite/config";

export default async function createCollections() {
    const collections = [
        lawyerProfile,
        chamberProfile,
        clientProfile,
        cases,
        chamberMembers,
        documents,
        lawyerExpertise,
        notifications,
        payments,
        subscriptions,
        chats_table,
        sessions_table
    ];

    for (const collection of collections) {
        await databases.createCollection(db, collection, collection, [
            Permission.create("users"),
            Permission.read("any"),
            Permission.read("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ]);
        console.log(`${collection} Collection Created`);
    }
    // Creating Attributes for each collection
    await Promise.all([
        databases.createStringAttribute(db, lawyerProfile, "full_name", 255, true),
        databases.createStringAttribute(db, lawyerProfile, "email", 255, true),
        databases.createStringAttribute(db, lawyerProfile, "role", 50, true),
        databases.createStringAttribute(db, lawyerProfile, "phone_number", 20, false),
        databases.createStringAttribute(db, lawyerProfile, "location", 255, false),
        databases.createStringAttribute(db, lawyerProfile, "cnic_number", 20, false),
        databases.createStringAttribute(db, lawyerProfile, "profile_pic", 255, false),
        databases.createStringAttribute(db, lawyerProfile, "client_type", 50, false),
        // Chamber Profile Attributes
        databases.createStringAttribute(db, chamberProfile, "chamber_name", 255, true),
        databases.createStringAttribute(db, chamberProfile, "license_number", 255, true),
        databases.createStringAttribute(db, chamberProfile, "address", 255, false),
        databases.createStringAttribute(db, chamberProfile, "city", 100, false),
        databases.createStringAttribute(db, chamberProfile, "state", 100, false),
        databases.createStringAttribute(db, chamberProfile, "country", 100, false),
        databases.createFloatAttribute(db, chamberProfile, "rating", false),
        // Client Profile Attributes
        databases.createStringAttribute(db, clientProfile, "full_name", 255, true),
        databases.createStringAttribute(db, clientProfile, "email", 255, true),
        databases.createStringAttribute(db, clientProfile, "role", 50, true),
        databases.createStringAttribute(db, clientProfile, "phone_number", 20, false),
        databases.createStringAttribute(db, clientProfile, "location", 255, false),
        databases.createStringAttribute(db, clientProfile, "cnic_number", 20, false),
        databases.createStringAttribute(db, clientProfile, "profile_pic", 255, false),
        databases.createStringAttribute(db, clientProfile, "client_type", 50, false),
        
        // Cases Attributes
        databases.createStringAttribute(db, cases, "title", 255, true),
        databases.createStringAttribute(db, cases, "description", 1000, false),
        databases.createStringAttribute(db, cases, "court_name", 255, false),
        databases.createStringAttribute(db, cases, "judge_name", 255, false),
        databases.createStringAttribute(db, cases, "status", 50, true),
        databases.createDatetimeAttribute(db, cases, "filing_date", false),
        databases.createDatetimeAttribute(db, cases, "next_hearing_date", false),   
        databases.createStringAttribute(db, cases, "case_type", 50, false),

        // Chamber Members Attributes
        databases.createStringAttribute(db, chamberMembers, "chamber_id", 255, true),
        databases.createStringAttribute(db, chamberMembers, "member_id", 255, true),
        databases.createStringAttribute(db, chamberMembers, "role", 50, true),
        databases.createStringAttribute(db, chamberMembers, "status", 50, true),

        // Documents Attributes
        databases.createStringAttribute(db, documents, "case_id", 255, true),
        databases.createStringAttribute(db, documents, "document_name", 255, true),
        databases.createStringAttribute(db, documents, "document_url", 255, true),
        databases.createStringAttribute(db, documents, "document_type", 50, true),

        // Lawyer Expertise Attributes
        databases.createStringAttribute(db, lawyerExpertise, "lawyer_id", 255, true),
        databases.createStringAttribute(db, lawyerExpertise, "experience", 50, true),
        databases.createStringAttribute(db, lawyerExpertise, "specialization", 50, true),
        databases.createStringAttribute(db, lawyerExpertise, "description", 1000, false),
        databases.createStringAttribute(db,lawyerExpertise, "Location", 255, false),
        databases.createStringAttribute(db, lawyerExpertise, "court_name", 255, false),

        // Notifications Attributes
        databases.createStringAttribute(db, notifications, "user_id", 255, true),
        databases.createStringAttribute(db, notifications, "message", 255, true),
        databases.createStringAttribute(db, notifications, "type", 50, true),

        // Payments Attributes
        databases.createStringAttribute(db, payments, "user_id", 255, true),
        databases.createStringAttribute(db, payments, "amount", 50, true),
        databases.createStringAttribute(db, payments, "status", 50, true),
        databases.createStringAttribute(db, payments, "payment_method", 50, true),
        databases.createStringAttribute(db, payments, "transaction_id", 50, true),
        databases.createStringAttribute(db, payments, "payment_date", 50, true),

        // Subscriptions Attributes
        databases.createStringAttribute(db, subscriptions, "user_id", 255, true),
        databases.createStringAttribute(db, subscriptions, "plan_id", 255, true),
        databases.createStringAttribute(db, subscriptions, "status", 50, true),
        databases.createStringAttribute(db, subscriptions, "subscription_date", 50, true),
        databases.createStringAttribute(db, subscriptions, "expiry_date", 50, true),

        // Case History Attributes
        databases.createStringAttribute(db, cases, "case_id", 255, true),
        databases.createStringAttribute(db, cases, "lawyer_id", 255, true),
        databases.createStringAttribute(db, cases, "status", 50, true),
        databases.createStringAttribute(db, cases, "description", 1000, false),
        databases.createStringAttribute(db, cases, "court_name", 255, false),
        databases.createStringAttribute(db, cases, "judge_name", 255, false),
        databases.createDatetimeAttribute(db, cases, "date", false ),

        // AI Suggestions Attributes
        databases.createStringAttribute(db, cases, "case_id", 255, true),
        databases.createStringAttribute(db, cases, "suggestion", 1000, true),
        databases.createStringAttribute(db, cases, "status", 50, true),
        databases.createStringAttribute(db, cases, "suggestion_type", 50, true),
        databases.createDatetimeAttribute(db, cases, "date", false),

        // create chat tables
        databases.createStringAttribute(db, chats_table, "chat_id", 255, true),
        databases.createStringAttribute(db, chats_table, "user_id", 255, true),
        databases.createStringAttribute(db, chats_table, "message", 255, true),
        databases.createStringAttribute(db, chats_table, "type", 50, true),
        databases.createDatetimeAttribute(db, chats_table, "date", false),
        databases.createStringAttribute(db, chats_table, "session_id", 50, true),

        // create session table
        databases.createStringAttribute(db, sessions_table, "session_id", 255, true),
        databases.createStringAttribute(db, sessions_table, "user_id", 255, true),
        databases.createEnumAttribute(db, sessions_table, "session_status", ["active", "non-active"], true),
        databases.createStringAttribute(db, sessions_table, "session_type", 50, true),
        databases.createStringAttribute(db, sessions_table, "session_name", 255, true),
        databases.createStringAttribute(db, sessions_table, "session_description", 1000, false),
    ]);
    console.log("Attributes Created for All Collections");
}