# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - button "Home" [ref=e3] [cursor=pointer]
    - strong [ref=e4]: XYZ Bank
    - button "Logout" [ref=e5] [cursor=pointer]
  - generic [ref=e6]:
    - generic [ref=e7]:
      - button "Back" [ref=e8] [cursor=pointer]
      - generic [ref=e9]:
        - textbox "yyyy-MM-ddTHH:mm:ss" [ref=e10]: 2025-08-26T20:01:02.710
        - textbox "yyyy-MM-ddTHH:mm:ss" [ref=e11]: 2025-08-26T20:01:02.710
      - button "Reset" [ref=e12] [cursor=pointer]
    - table [ref=e13]:
      - rowgroup [ref=e14]:
        - row "Date-Time Amount Transaction Type" [ref=e15]:
          - cell "Date-Time" [ref=e16]:
            - link "Date-Time" [ref=e17]:
              - /url: "#"
          - cell "Amount" [ref=e18]:
            - generic [ref=e19]: Amount
          - cell "Transaction Type" [ref=e20]:
            - generic [ref=e21]: Transaction Type
      - rowgroup [ref=e22]:
        - row "Aug 26, 2025 8:01:02 PM 200 Credit" [ref=e23]:
          - cell "Aug 26, 2025 8:01:02 PM" [ref=e24]
          - cell "200" [ref=e25]
          - cell "Credit" [ref=e26]
    - button ">" [ref=e28] [cursor=pointer]
```