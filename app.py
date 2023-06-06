import openai
import streamlit as st


openai.api_key  = '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'
user = 'Bishal'
background = "Data Science, Deep Learning, Computer Vision, Neural Architecture Search, Pruning, Algorithmic Finance Trading"


def show_messages(text):
    messages_str = [
        f"{_['role']}: {_['content']}" for _ in st.session_state["messages"][1:]
    ]
    text.text_area("Messages", value=str("\n".join(messages_str)), height=400)




BASE_PROMPT = [ {'role':'system', 'content':f"""
Output only the following:
1. Complex terms and every abbreviations within the string (ignore common sense terms or abbreviations such as state-of-the-art (SOTA))
2. A table of terms and abbreviations, with definitions and a score of user knowledge level. Columns are as follows:
- term or abbreviation
- long form of abbreviation (for terms, write NA)
- definition of term or abbreviation in context of the paragraph
- Assuming the user claims to have a background in {background}, provide a score from 0-100 that predicts how likely they are to know each term
3. The 'complex string' is rewritten with the same sentence structure that the user provided. Pay extra attention to and explain every term with a score of 6 or below.

"""},

{'role':'assistant', 'content': f""" Welcome to ShorterPath, {user}. What string would you like to simplify?"""} 
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