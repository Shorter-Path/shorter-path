import openai
import streamlit as st


def show_messages(text):
    messages_str = [
        f"{_['role']}: {_['content']}" for _ in st.session_state["messages"][1:]
    ]
    text.text_area("Messages", value=str("\n".join(messages_str)), height=400)


openai.api_key  = 'your openapi key'

BASE_PROMPT = [ {'role':'system', 'content':"""
You are Explainer, a service to simplify complex topics for newer learners. \\
Once the user provides their background, you ask for a 'complex paragraph' that the user wants explained. This paragraph is not necessarily related to their background. \
Identify terms from the 'complex paragraph' that the user may not be aware of, according to their background. Do not include terms that the user will be familar with.
First, output the terms and define them in simplified language, in a table format.
Finally, rewrite the provided paragraph in a simplified manner,  while still using the terms defined in the table. 
"""},

{'role':'assistant', 'content':"""
Welcome to ShorterPath. What is your background (A list of skills and areas of interest, comma delimited)"""} 
 ]


if "messages" not in st.session_state:
    st.session_state["messages"] = BASE_PROMPT

st.header("Shorter Path")

text = st.empty()
show_messages(text)
prompt = st.text_input("Prompt", value="Enter your message here...")

if st.button("Send"):
    with st.spinner("Generating response..."):
        st.session_state["messages"] += [{"role": "user", "content": prompt}]
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=st.session_state["messages"]
        )
        message_response = response["choices"][0]["message"]["content"]
        st.session_state["messages"] += [
            {"role": "system", "content": message_response}
        ]
        show_messages(text)

if st.button("Clear"):
    st.session_state["messages"] = BASE_PROMPT
    show_messages(text)