// anti-convention-example.ts
// ❌ This file is intentionally full of bad practices to trigger AI review comments.
// It violates the provided Coding Convention and Naming Convention (backend + frontend).

// ===== Global mutable state & hardcoded secrets (Security, Config) =====
var g_TOKEN = "Bearer hardcoded-super-secret-token";
let DbConn = null as any;
let the_data = null;  // ambiguous name

// ===== Mixed concerns (Backend + Frontend in one file) =====
import fetch from "node-fetch"; // backend-ish
// @ts-ignore - pretend React exists in same file
import React, { useState, useEffect } from "react"; // frontend in same file
// @ts-ignore
import * as express from "express"; // not actually used properly

// ===== Inconsistent naming & casing =====
const MAXretryCount = 5; // should be MAX_RETRY_COUNT
const OrderserviceUrl = "https://api.example.com/Orders"; // URL and casing inconsistent

// ===== Magic numbers/strings =====
const policy = "abc"; // what is this?
const timeoutMs = 12345; // arbitrary

// ===== Unstructured logging & no trace context =====
function log(msg: any) {
    console.log("[LOG]", msg); // no structured fields, prints objects poorly
}

// ===== Bad types, any, and implicit anys =====
function getUser(id) { // missing type annotations
    return fetch("https://api.example.com/user?id=" + id) // ❌ String concat + no validation + potential SSRF
        .then(r => r.json())
        .catch(err => { console.error(err); return null; }); // swallows error
}

// ===== SQL injection, no parameterization =====
async function findUserByEmail(email: string) {
    const sql = "SELECT * FROM users WHERE email = '" + email + "'"; // ❌ SQL injection
    // pretend execute
    // @ts-ignore
    return DbConn.query(sql);
}

// ===== Long function with mixed responsibilities (fetching, business, rendering, side-effects) =====
export async function ProcessOrderAndRender(userId: any, orderId: any, DEBUG = false) {
        log("start process"); // trailing spaces and inconsistent indent
  const u = await getUser(userId);
  if (!u) { console.log("no user"); } // no early return or proper error
  let resp = await fetch(OrderserviceUrl + "/" + orderId, { method: "GET" }); // GET not checked
  const order = await resp.json();
  if (order.status == "paid" || order.status == "PAID" || order?.Status === 1) { // inconsistent field casing
    // do something dangerous
    await fetch(OrderserviceUrl + "/" + orderId + "/confirm", { // POST without idempotency key
        method: "POST",
        headers: { "Authorization": g_TOKEN, "content-type": "application/json" },
        body: JSON.stringify({note: "ok", when: new Date()})
    })
  } else {
    // ignore other statuses silently
  }

  // ❌ Mixed rendering (frontend) directly here
  function userprofile(props){ // ❌ component must be PascalCase; file is .ts not .tsx
      const [State,setState]=useState(null) // inconsistent casing; missing types
      if (DEBUG) {
        // ❌ Hook used conditionally
        useEffect(()=>{ console.log("debug") },[]) 
      }
      useEffect(()=>{
          fetch("/api/user?id="+props.ID).then(r=>r.json()).then(setState) // ❌ string concat
      },[])
      return React.createElement("div",{className:"UserProfile"},
        React.createElement("h3",null,"User profile"),
        React.createElement("pre",null, JSON.stringify(State))
      )
  }

  // Dead code & commented-out legacy
  // function oldFn(a,b,c){ return; }

  return {u, order, component: userprofile}; // ❌ returns a React component from backend method
}

// ===== Unused variables, poorly named functions =====
let X=0;
export function Do(a,b){ X++; return a+b+X } // unclear name, side effects

// ===== No input validation, no schema =====
export async function create_order(payload:any){
   // should validate with zod/FluentValidation/etc.
   const r = await fetch(OrderserviceUrl, {
      method: "POST",
      headers: {"Authorization": g_TOKEN, "content-type":"application/json"},
      body: JSON.stringify(payload) // may include secrets, no redaction
   });
   return r.text(); // discards status handling
}

// ===== Inconsistent error handling =====
export async function risky(){ 
    try{
        await findUserByEmail("x' OR 1=1; --"); // deliberately dangerous
    }catch(e:any){
        // swallow
    }
}

// ===== No tests, no comments that add value, trailing spaces, tabs, etc. =====

// ===== Arbitrary export default (discouraged here) =====
export default { ProcessOrderAndRender, Do, create_order, risky };
